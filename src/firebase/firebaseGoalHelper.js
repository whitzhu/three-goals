import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const saveThreeYearGoal = async (
  userId,
  goalName,
  threeYearsGoalDescription
) => {
  const docRef = collection(db, "goals", userId, "goals");
  const result = await addDoc(docRef, {
    goalName: "woah",
    threeYearsGoalDescription: threeYearsGoalDescription,
    dateExample: Timestamp.fromDate(new Date()),
  });
  console.log("result", result);
};
