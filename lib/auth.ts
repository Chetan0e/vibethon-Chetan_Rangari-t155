import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const register = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // Initialize user data in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    xp: 0,
    progress: 0,
    level: "Seed",
    createdAt: new Date(),
  });
  
  return userCredential;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  
  // Check if user exists in Firestore, if not initialize
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists()) {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      xp: 0,
      progress: 0,
      level: "Seed",
      createdAt: new Date(),
    });
  }
  
  return userCredential;
};

export const logout = () => signOut(auth);

export const getCurrentUser = () => auth.currentUser;

export const onAuthChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const addXP = async (amount: number) => {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    const currentXP = userSnap.data().xp || 0;
    const newXP = currentXP + amount;
    const newProgress = Math.min(100, Math.floor(newXP / 10));
    
    let newLevel = "Seed";
    if (newXP >= 500) newLevel = "Bloom";
    else if (newXP >= 200) newLevel = "Sprout";
    
    await setDoc(userRef, {
      xp: newXP,
      progress: newProgress,
      level: newLevel,
    }, { merge: true });
  }
};
