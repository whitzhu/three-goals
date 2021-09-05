import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const saveNewGoal = async (userId, data) => {
  const docRef = collection(db, "goals", userId, "goals");
  const result = await addDoc(docRef, {
    ...data,
    createdAt: Timestamp.fromDate(new Date()),
  });
  return result.id;
};
