/**
 * Personalization API Route
 * Uses Vertex AI (same as Cloud Run TTS service) to generate sport-specific placeholder values
 * Authentication: Firebase ID token in Authorization header
 */

import { NextRequest, NextResponse } from "next/server";
import { VertexAI } from "@google-cloud/vertexai";

// GCP Project (same as Cloud Run service)
const GCP_PROJECT = process.env.GOOGLE_CLOUD_PROJECT || "fabled-emissary-476021-g0";
const GCP_LOCATION = process.env.GOOGLE_CLOUD_REGION || "us-central1";

// Gemini model for personalization
const MODEL_ID = "gemini-2.0-flash-001";

interface PersonalizationRequest {
  sport: string;
  skill?: string;
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

export async function POST(request: NextRequest) {
  try {
    // Verify authorization header exists
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing authorization token" },
        { status: 401 }
      );
    }

    // Parse request body
    const body: PersonalizationRequest = await request.json();
    const { sport, skill } = body;

    if (!sport) {
      return NextResponse.json(
        { error: "Sport is required" },
        { status: 400 }
      );
    }

    // Initialize Vertex AI client (uses Application Default Credentials / service account)
    const vertexAI = new VertexAI({
      project: GCP_PROJECT,
      location: GCP_LOCATION,
    });

    const generativeModel = vertexAI.getGenerativeModel({
      model: MODEL_ID,
    });

    // Build prompt for sport-specific values
    const prompt = `You are helping personalize a mental training visualization script for an athlete.

Sport: ${sport}
${skill ? `Specific skill focus: ${skill}` : ""}

Generate realistic, vivid, and sport-specific values for these placeholders. Keep each value concise (1-2 sentences max). Make them feel authentic to someone who actually plays ${sport}.

Return ONLY a JSON object with these exact keys (no markdown, no explanation):
{
  "sport": "${sport}",
  "environment": "description of the competition/training environment",
  "sounds": "specific ambient sounds during competition",
  "gear": "equipment and uniform details",
  "victory_action": "how the athlete celebrates after winning/scoring",
  "training_action": "a common training drill or practice activity",
  "skill": "the key skill being visualized${skill ? ` (focus on: ${skill})` : ""}",
  "body_sensation": "physical feeling when performing at peak",
  "crowd": "description of spectators/audience",
  "coach_voice": "motivational phrase a coach might say"
}`;

    // Generate content
    const result = await generativeModel.generateContent(prompt);
    const response = result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No response from model");
    }

    // Parse JSON from response (handle potential markdown code blocks)
    let jsonText = text.trim();
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.slice(7);
    }
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.slice(3);
    }
    if (jsonText.endsWith("```")) {
      jsonText = jsonText.slice(0, -3);
    }
    jsonText = jsonText.trim();

    const values: PersonalizationValues = JSON.parse(jsonText);

    console.log(`[Personalize] Generated values for sport: ${sport}`);

    return NextResponse.json({ values });
  } catch (error) {
    console.error("[Personalize] Error:", error);

    // Return default values on error
    const sport = "your sport";
    return NextResponse.json({
      values: {
        sport,
        environment: "your training space",
        sounds: "the sounds around you",
        gear: "your equipment",
        victory_action: "celebrating your success",
        training_action: "practicing your technique",
        skill: "your key skill",
        body_sensation: "feeling strong and focused",
        crowd: "supporters watching",
        coach_voice: "trust your training",
      },
    });
  }
}
