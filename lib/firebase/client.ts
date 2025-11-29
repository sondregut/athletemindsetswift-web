"use client";

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { firebaseConfig, validateFirebaseConfig } from "./config";

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

function initializeFirebase() {
  if (typeof window === "undefined") {
    return { app: undefined, auth: undefined, db: undefined, storage: undefined };
  }

  if (!validateFirebaseConfig()) {
    console.error("Firebase configuration is incomplete");
    return { app: undefined, auth: undefined, db: undefined, storage: undefined };
  }

  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  return { app, auth, db, storage };
}

// Initialize on module load (client-side only)
if (typeof window !== "undefined") {
  const initialized = initializeFirebase();
  app = initialized.app;
  auth = initialized.auth;
  db = initialized.db;
  storage = initialized.storage;
}

export { app, auth, db, storage };
export { initializeFirebase };
