// Firebase configuration for web app
// Project: fabled-emissary-476021-g0 (same as iOS app)

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate that all required config values are present
export function validateFirebaseConfig() {
  const requiredKeys = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ] as const;

  const missingKeys = requiredKeys.filter(
    (key) => !firebaseConfig[key]
  );

  if (missingKeys.length > 0) {
    console.warn(
      `Missing Firebase config keys: ${missingKeys.join(", ")}. ` +
      `Make sure to set the NEXT_PUBLIC_FIREBASE_* environment variables.`
    );
    return false;
  }

  return true;
}
