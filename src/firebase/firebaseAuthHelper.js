import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const login = async () => {
  const provider = new GoogleAuthProvider();
  auth.useDeviceLanguage();
  const result = await signInWithPopup(auth, provider);
};

export const logout = () => signOut(auth);
