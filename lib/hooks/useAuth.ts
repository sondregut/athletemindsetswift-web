"use client";

import { useState, useEffect, useCallback } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";

export interface UserProfile {
  displayName?: string;
  sport?: string;
  sportDiscipline?: string;
  experienceLevel?: string;
  ageRange?: string;
  trainingGoals?: string[];
  onboardingCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
  });

  // Fetch user profile from Firestore
  const fetchProfile = useCallback(async (userId: string) => {
    if (!db) return null;

    try {
      const docRef = doc(db, "swift_users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    if (!auth) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await fetchProfile(user.uid);
        setState({
          user,
          profile,
          loading: false,
          error: null,
        });
      } else {
        setState({
          user: null,
          profile: null,
          loading: false,
          error: null,
        });
      }
    });

    return () => unsubscribe();
  }, [fetchProfile]);

  // Sign in with email and password
  const signIn = useCallback(async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase not initialized");

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const profile = await fetchProfile(result.user.uid);

      setState({
        user: result.user,
        profile,
        loading: false,
        error: null,
      });

      return result.user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Sign in failed";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, [fetchProfile]);

  // Sign up with email and password
  const signUp = useCallback(
    async (email: string, password: string, displayName?: string) => {
      if (!auth || !db) throw new Error("Firebase not initialized");

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Update display name if provided
        if (displayName) {
          await updateProfile(result.user, { displayName });
        }

        // Create initial user profile in Firestore
        const userProfile: UserProfile = {
          displayName: displayName || "",
          onboardingCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await setDoc(doc(db, "swift_users", result.user.uid), {
          ...userProfile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        setState({
          user: result.user,
          profile: userProfile,
          loading: false,
          error: null,
        });

        return result.user;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Sign up failed";
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    []
  );

  // Sign out
  const signOut = useCallback(async () => {
    if (!auth) throw new Error("Firebase not initialized");

    try {
      await firebaseSignOut(auth);
      setState({
        user: null,
        profile: null,
        loading: false,
        error: null,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Sign out failed";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (email: string) => {
    if (!auth) throw new Error("Firebase not initialized");

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Password reset failed";
      throw new Error(errorMessage);
    }
  }, []);

  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    if (!auth || !db) throw new Error("Firebase not initialized");

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Check if user profile exists
      const existingProfile = await fetchProfile(result.user.uid);

      // Track if this is a truly new user (no profile at all)
      const isNewUser = !existingProfile;

      let profile = existingProfile;

      // If no profile, create one (new user)
      if (!profile) {
        const userProfile: UserProfile = {
          displayName: result.user.displayName || "",
          onboardingCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await setDoc(doc(db, "swift_users", result.user.uid), {
          ...userProfile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        profile = userProfile;
      }

      setState({
        user: result.user,
        profile,
        loading: false,
        error: null,
      });

      // Only treat as new user if they had no profile at all
      // Existing users (even without onboardingCompleted) go to dashboard
      return { user: result.user, isNewUser };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Google sign in failed";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, [fetchProfile]);

  // Update user profile
  const updateUserProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      if (!db || !state.user) throw new Error("Not authenticated");

      try {
        // Filter out undefined values - Firestore doesn't accept them
        const cleanedUpdates = Object.fromEntries(
          Object.entries(updates).filter(([, value]) => value !== undefined)
        );

        const docRef = doc(db, "swift_users", state.user.uid);
        await setDoc(
          docRef,
          {
            ...cleanedUpdates,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );

        // Update local state
        setState((prev) => ({
          ...prev,
          profile: prev.profile
            ? { ...prev.profile, ...cleanedUpdates }
            : { ...cleanedUpdates },
        }));
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Profile update failed";
        throw new Error(errorMessage);
      }
    },
    [state.user]
  );

  // Get ID token for API calls
  const getIdToken = useCallback(async () => {
    if (!state.user) throw new Error("Not authenticated");
    return state.user.getIdToken();
  }, [state.user]);

  return {
    user: state.user,
    profile: state.profile,
    loading: state.loading,
    error: state.error,
    isAuthenticated: !!state.user,
    signIn,
    signUp,
    signOut,
    resetPassword,
    signInWithGoogle,
    updateUserProfile,
    getIdToken,
    refreshProfile: () =>
      state.user ? fetchProfile(state.user.uid) : Promise.resolve(null),
  };
}
