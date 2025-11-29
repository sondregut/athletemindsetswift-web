/**
 * TTS Service - Calls Cloud Run API for Gemini 2.5 Flash TTS
 *
 * Uses a Next.js API route proxy to avoid CORS issues.
 * The proxy forwards requests to the Cloud Run endpoint:
 * https://athlete-mindset-api-soygfl7erq-uc.a.run.app/api/tts/generate
 */

import {
  TrainingTemplate,
  PersonalizedSession,
  PersonalizedSegment,
  TTSVoice,
} from "@/types/library";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/client";

// TTS API endpoint - use local proxy to avoid CORS issues
const TTS_API_ENDPOINT = "/api/tts/generate";

// Personalization API endpoint (calls Gemini for placeholder replacement)
const PERSONALIZE_API_ENDPOINT = "/api/personalize";

// ============================================================
// TYPES
// ============================================================

interface TTSSegment {
  id: string;
  content: string;
  pauseAfterSeconds: number;
}

interface TTSRequest {
  userId: string;
  sessionId: string;
  segments: TTSSegment[];
  voice: string;
  speakingRate: number;
}

interface TTSResponse {
  audioData: string; // Base64 encoded WAV
  durationSeconds: number;
  segmentCount: number;
}

interface PersonalizationValues {
  sport: string;
  environment: string;
  sounds: string;
  gear: string;
  victory_action: string;
  training_action: string;
  skill: string;
  body_sensation: string;
  crowd: string;
  coach_voice: string;
}

interface GenerationProgress {
  stage: "fetching" | "personalizing" | "generating" | "uploading" | "complete";
  current: number;
  total: number;
}

// ============================================================
// PERSONALIZATION
// ============================================================

/**
 * Get sport-specific placeholder values from Gemini
 */
export async function personalizeScript(
  sport: string,
  skill?: string,
  getIdToken?: () => Promise<string>
): Promise<PersonalizationValues> {
  try {
    const token = getIdToken ? await getIdToken() : null;

    const response = await fetch(PERSONALIZE_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ sport, skill }),
    });

    if (!response.ok) {
      console.warn("[TTS] Personalization failed, using defaults");
      return getDefaultPersonalization(sport);
    }

    const data = await response.json();
    return data.values || getDefaultPersonalization(sport);
  } catch (error) {
    console.error("[TTS] Personalization error:", error);
    return getDefaultPersonalization(sport);
  }
}

/**
 * Default personalization values when API fails
 */
function getDefaultPersonalization(sport: string): PersonalizationValues {
  return {
    sport: sport || "your sport",
    environment: "your training space",
    sounds: "the sounds around you",
    gear: "your equipment",
    victory_action: "celebrating your success",
    training_action: "practicing your technique",
    skill: "your key skill",
    body_sensation: "feeling strong and focused",
    crowd: "supporters watching",
    coach_voice: "trust your training",
  };
}

/**
 * Apply personalization values to segment content
 */
function applyPersonalization(
  content: string,
  values: PersonalizationValues
): string {
  return content
    .replace(/{sport}/gi, values.sport)
    .replace(/{environment}/gi, values.environment)
    .replace(/{sounds}/gi, values.sounds)
    .replace(/{gear}/gi, values.gear)
    .replace(/{victory_action}/gi, values.victory_action)
    .replace(/{training_action}/gi, values.training_action)
    .replace(/{skill}/gi, values.skill)
    .replace(/{body_sensation}/gi, values.body_sensation)
    .replace(/{crowd}/gi, values.crowd)
    .replace(/{coach_voice}/gi, values.coach_voice);
}

// ============================================================
// TTS GENERATION
// ============================================================

/**
 * Generate TTS audio for a single text segment (preview)
 */
export async function generatePreviewAudio(
  text: string,
  voice: TTSVoice,
  getIdToken: () => Promise<string>
): Promise<ArrayBuffer> {
  const token = await getIdToken();

  const response = await fetch(TTS_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: "preview",
      sessionId: `preview_${Date.now()}`,
      segments: [{ id: "preview", content: text, pauseAfterSeconds: 0 }],
      voice: voice,
      speakingRate: 1.0,
    } as TTSRequest),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`TTS preview failed: ${error}`);
  }

  const data: TTSResponse = await response.json();

  // Decode base64 to ArrayBuffer
  const binaryString = atob(data.audioData);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}

/**
 * Generate complete session with TTS audio
 */
export async function generateSession(
  template: TrainingTemplate,
  userId: string,
  sport: string,
  voice: TTSVoice,
  getIdToken: () => Promise<string>,
  onProgress?: (progress: GenerationProgress) => void
): Promise<PersonalizedSession> {
  const sessionId = crypto.randomUUID();

  try {
    // Stage 1: Personalizing
    onProgress?.({ stage: "personalizing", current: 1, total: 4 });

    const values = await personalizeScript(sport, undefined, getIdToken);

    // Stage 2: Apply personalization to segments
    const personalizedSegments: PersonalizedSegment[] = template.segments.map(
      (segment) => ({
        id: segment.id,
        content: applyPersonalization(segment.content, values),
        pause_after_seconds: segment.pause_after_seconds,
      })
    );

    // Stage 3: Generate TTS audio
    onProgress?.({ stage: "generating", current: 2, total: 4 });

    const token = await getIdToken();

    const ttsSegments: TTSSegment[] = personalizedSegments.map((seg) => ({
      id: seg.id,
      content: seg.content,
      pauseAfterSeconds: seg.pause_after_seconds,
    }));

    const ttsResponse = await fetch(TTS_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        sessionId,
        segments: ttsSegments,
        voice: voice,
        speakingRate: 1.0,
      } as TTSRequest),
    });

    if (!ttsResponse.ok) {
      const error = await ttsResponse.text();
      throw new Error(`TTS generation failed: ${error}`);
    }

    const ttsData: TTSResponse = await ttsResponse.json();

    // Stage 4: Upload to Firebase Storage
    onProgress?.({ stage: "uploading", current: 3, total: 4 });

    const audioUrl = await uploadAudioToStorage(
      ttsData.audioData,
      userId,
      sessionId
    );

    // Complete
    onProgress?.({ stage: "complete", current: 4, total: 4 });

    // Create session object
    const session: PersonalizedSession = {
      id: sessionId,
      template_id: template.id,
      user_id: userId,
      title: template.title,
      description: template.description,
      category: template.category,
      sport,
      voice_id: voice,
      segments: personalizedSegments.map((seg) => ({
        ...seg,
        audio_url: audioUrl, // All segments share combined audio
      })),
      total_duration_seconds: Math.round(ttsData.durationSeconds),
      audio_url: audioUrl,
      created_at: new Date(),
    };

    console.log(`[TTS] Session generated: ${sessionId}, duration: ${ttsData.durationSeconds}s`);

    return session;
  } catch (error) {
    console.error("[TTS] Generation error:", error);
    throw error;
  }
}

/**
 * Upload audio data to Firebase Storage
 */
async function uploadAudioToStorage(
  base64Audio: string,
  userId: string,
  sessionId: string
): Promise<string> {
  if (!storage) {
    throw new Error("Firebase Storage not initialized");
  }

  // Decode base64 to Blob
  const binaryString = atob(base64Audio);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: "audio/wav" });

  // Upload to Firebase Storage
  const storageRef = ref(storage, `training_sessions/${userId}/${sessionId}.wav`);
  await uploadBytes(storageRef, blob, {
    contentType: "audio/wav",
  });

  // Get download URL
  const downloadUrl = await getDownloadURL(storageRef);
  console.log(`[TTS] Audio uploaded: ${downloadUrl}`);

  return downloadUrl;
}

// ============================================================
// AUDIO UTILITIES
// ============================================================

/**
 * Create an audio element and play it
 */
export function playAudioFromArrayBuffer(buffer: ArrayBuffer): HTMLAudioElement {
  const blob = new Blob([buffer], { type: "audio/wav" });
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();

  // Clean up URL when done
  audio.onended = () => URL.revokeObjectURL(url);

  return audio;
}

/**
 * Create audio context for Web Audio API
 */
export function createAudioContext(): AudioContext {
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
}
