/**
 * TTS Generate API Route - Proxy to Cloud Run TTS service
 * Bypasses CORS issues by proxying requests through Next.js server
 */

import { NextRequest, NextResponse } from "next/server";

// Cloud Run TTS API endpoint (same as iOS app uses)
const TTS_API_ENDPOINT =
  "https://athlete-mindset-api-soygfl7erq-uc.a.run.app/api/tts/generate";

export async function POST(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing authorization token" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    console.log("[TTS Proxy] Forwarding request to Cloud Run:", {
      userId: body.userId,
      sessionId: body.sessionId,
      segmentCount: body.segments?.length,
      voice: body.voice,
    });

    // Forward request to Cloud Run TTS service
    const response = await fetch(TTS_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[TTS Proxy] Cloud Run error:", response.status, errorText);
      return NextResponse.json(
        { error: `TTS service error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log("[TTS Proxy] Response received:", {
      durationSeconds: data.durationSeconds,
      segmentCount: data.segmentCount,
      audioDataLength: data.audioData?.length,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("[TTS Proxy] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "TTS generation failed" },
      { status: 500 }
    );
  }
}
