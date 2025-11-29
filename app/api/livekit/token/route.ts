import { NextRequest, NextResponse } from "next/server";

// LiveKit token endpoint - proxies to Cloud Functions
const CLOUD_FUNCTIONS_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://us-central1-fabled-emissary-476021-g0.cloudfunctions.net";

export async function POST(request: NextRequest) {
  try {
    // Get the Firebase ID token from the Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const firebaseToken = authHeader.substring(7);

    // Get request body
    const body = await request.json();
    const { roomName, identity, metadata } = body;

    if (!roomName || !identity) {
      return NextResponse.json(
        { error: "Missing roomName or identity" },
        { status: 400 }
      );
    }

    console.log("[LiveKit Token API] Fetching token for room:", roomName);

    // Forward request to Cloud Functions
    const response = await fetch(`${CLOUD_FUNCTIONS_URL}/getLivekitToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${firebaseToken}`,
      },
      body: JSON.stringify({
        roomName,
        identity,
        metadata: metadata || "{}",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[LiveKit Token API] Error from Cloud Functions:", errorText);
      return NextResponse.json(
        { error: "Failed to get LiveKit token", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("[LiveKit Token API] Token received for room:", data.roomName);

    return NextResponse.json(data);
  } catch (error) {
    console.error("[LiveKit Token API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
