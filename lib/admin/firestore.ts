import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type {
  VisualizationTemplate,
  BreathworkTechnique,
  AomiTechnique
} from '@/types/admin';

// Collection names (prefixed with swift_ to match the agent's collections)
const COLLECTIONS = {
  visualizations: 'swift_visualization_templates',
  breathwork: 'swift_breathwork_techniques',
  aomi: 'swift_aomi_techniques',
};

// Helper to get Firestore instance with type guard
function getDb() {
  if (!db) {
    throw new Error('Firestore not initialized');
  }
  return db;
}

// Helper to convert Firestore timestamps
function convertTimestamp(timestamp: Timestamp | Date | undefined): Date {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return new Date();
}

// ============ VISUALIZATIONS ============

export async function getVisualizations(): Promise<VisualizationTemplate[]> {
  const q = query(
    collection(getDb(), COLLECTIONS.visualizations),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: convertTimestamp(doc.data().createdAt),
    updatedAt: convertTimestamp(doc.data().updatedAt),
  })) as VisualizationTemplate[];
}

export async function getVisualization(id: string): Promise<VisualizationTemplate | null> {
  const docRef = doc(getDb(), COLLECTIONS.visualizations, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return {
    id: snapshot.id,
    ...snapshot.data(),
    createdAt: convertTimestamp(snapshot.data().createdAt),
    updatedAt: convertTimestamp(snapshot.data().updatedAt),
  } as VisualizationTemplate;
}

export async function createVisualization(
  data: Omit<VisualizationTemplate, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const docRef = await addDoc(collection(getDb(), COLLECTIONS.visualizations), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateVisualization(
  id: string,
  data: Partial<Omit<VisualizationTemplate, 'id' | 'createdAt'>>
): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.visualizations, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteVisualization(id: string): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.visualizations, id);
  await deleteDoc(docRef);
}

// ============ BREATHWORK ============

export async function getBreathworkTechniques(): Promise<BreathworkTechnique[]> {
  const q = query(
    collection(getDb(), COLLECTIONS.breathwork),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: convertTimestamp(doc.data().createdAt),
    updatedAt: convertTimestamp(doc.data().updatedAt),
  })) as BreathworkTechnique[];
}

export async function getBreathworkTechnique(id: string): Promise<BreathworkTechnique | null> {
  const docRef = doc(getDb(), COLLECTIONS.breathwork, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return {
    id: snapshot.id,
    ...snapshot.data(),
    createdAt: convertTimestamp(snapshot.data().createdAt),
    updatedAt: convertTimestamp(snapshot.data().updatedAt),
  } as BreathworkTechnique;
}

export async function createBreathworkTechnique(
  data: Omit<BreathworkTechnique, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const docRef = await addDoc(collection(getDb(), COLLECTIONS.breathwork), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateBreathworkTechnique(
  id: string,
  data: Partial<Omit<BreathworkTechnique, 'id' | 'createdAt'>>
): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.breathwork, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteBreathworkTechnique(id: string): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.breathwork, id);
  await deleteDoc(docRef);
}

// ============ AOMI ============

export async function getAomiTechniques(): Promise<AomiTechnique[]> {
  const q = query(
    collection(getDb(), COLLECTIONS.aomi),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: convertTimestamp(doc.data().createdAt),
    updatedAt: convertTimestamp(doc.data().updatedAt),
  })) as AomiTechnique[];
}

export async function getAomiTechnique(id: string): Promise<AomiTechnique | null> {
  const docRef = doc(getDb(), COLLECTIONS.aomi, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return {
    id: snapshot.id,
    ...snapshot.data(),
    createdAt: convertTimestamp(snapshot.data().createdAt),
    updatedAt: convertTimestamp(snapshot.data().updatedAt),
  } as AomiTechnique;
}

export async function createAomiTechnique(
  data: Omit<AomiTechnique, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const docRef = await addDoc(collection(getDb(), COLLECTIONS.aomi), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateAomiTechnique(
  id: string,
  data: Partial<Omit<AomiTechnique, 'id' | 'createdAt'>>
): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.aomi, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteAomiTechnique(id: string): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.aomi, id);
  await deleteDoc(docRef);
}

// ============ STATS ============

export async function getStats(): Promise<{
  visualizations: number;
  breathwork: number;
  aomi: number;
}> {
  const [vizSnapshot, breathworkSnapshot, aomiSnapshot] = await Promise.all([
    getDocs(collection(getDb(), COLLECTIONS.visualizations)),
    getDocs(collection(getDb(), COLLECTIONS.breathwork)),
    getDocs(collection(getDb(), COLLECTIONS.aomi)),
  ]);

  return {
    visualizations: vizSnapshot.size,
    breathwork: breathworkSnapshot.size,
    aomi: aomiSnapshot.size,
  };
}
