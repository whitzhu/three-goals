import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const saveNewGoal = async (userId, data) => {
  const docRef = collection(db, "goals", userId, "goals");
  const result = await addDoc(docRef, {
    ...data,
    dateExample: Timestamp.fromDate(new Date()),
  });
  console.log("result", result);
};
