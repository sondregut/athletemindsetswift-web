import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let adminApp: App | undefined;
let adminAuth: Auth | undefined;
let adminDb: Firestore | undefined;

function initializeAdminFirebase() {
  if (getApps().length === 0) {
    // Check for service account credentials
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccount) {
      try {
        const credentials = JSON.parse(serviceAccount);
        adminApp = initializeApp({
          credential: cert(credentials),
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
      } catch (error) {
        console.error("Failed to parse Firebase service account:", error);
        // Fall back to default credentials (works in GCP environment)
        adminApp = initializeApp({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
      }
    } else {
      // Use application default credentials (for local dev with gcloud auth)
      adminApp = initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    }
  } else {
    adminApp = getApps()[0];
  }

  adminAuth = getAuth(adminApp);
  adminDb = getFirestore(adminApp);

  return { adminApp, adminAuth, adminDb };
}

// Lazy initialization
export function getAdminAuth(): Auth {
  if (!adminAuth) {
    initializeAdminFirebase();
  }
  return adminAuth!;
}

export function getAdminFirestore(): Firestore {
  if (!adminDb) {
    initializeAdminFirebase();
  }
  return adminDb!;
}

export { adminApp, adminAuth, adminDb };
