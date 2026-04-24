// ============================================================
// REPLACE THESE VALUES WITH YOUR FIREBASE PROJECT CREDENTIALS
// Go to Firebase Console > Project Settings > General > Your Apps
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyA2AUnZb4FxubE6Z2ODoFVdRX5qEVQwHvY",
  authDomain: "school-transport-27795.firebaseapp.com",
  projectId: "school-transport-27795",
  storageBucket: "school-transport-27795.firebasestorage.app",
  messagingSenderId: "827429577345",
  appId: "1:827429577345:web:b5629550150c2a4732e380"
};

// ============================================================
// Firebase SDK v10.7.0 (stable) — do NOT change the version
// ============================================================
import { initializeApp }           from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs,
  updateDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  getAuth, signInWithEmailAndPassword,
  signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);
const auth = getAuth(app);

export {
  db, auth,
  collection, addDoc, getDocs, updateDoc, deleteDoc,
  doc, query, where, orderBy, serverTimestamp,
  signInWithEmailAndPassword, signOut, onAuthStateChanged
};

// ============================================================
// SCHOOL CONFIGURATION
// ============================================================
export const SCHOOL_CYCLES = {
  kindergarten: { label: "Kindergarten", grades: ["KG1", "KG2"],             icon: "🌱" },
  primary:      { label: "Primary",       grades: ["G1","G2","G3","G4","G5"], icon: "📚" },
  middle:       { label: "Middle",        grades: ["G6","G7","G8"],           icon: "🏫" },
  higher:       { label: "Higher",        grades: ["G9","G10","G11","G12"],   icon: "🎓" }
};

export const ALL_GRADES = [
  "KG1","KG2","G1","G2","G3","G4","G5",
  "G6","G7","G8","G9","G10","G11","G12"
];

export const SECTIONS = [
  "A","B","C","D","E","F",
  "AB","BB","CB","DB","AG","BG","CG","DG"
];

export const DISPERSAL_MODES = ["School Bus","Own Transport","By Walk"];

export const PICKUP_NAMES = ["Parent","Car Lift","Driver","Guardian","Sibling","Other"];

export function gradeToGycle(grade) {
  for (const [key, cyc] of Object.entries(SCHOOL_CYCLES)) {
    if (cyc.grades.includes(grade)) return key;
  }
  return "unknown";
}
