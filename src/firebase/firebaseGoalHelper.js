import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  Timestamp,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const fetchAllGoals = async (userId, dispatch) => {
  const querySnapshot = await getDocs(
    collection(db, "goals", userId, "top_three_goals")
  );
  const goalEntries = [];
  querySnapshot.forEach((doc) => {
    goalEntries.push({ ...doc.data(), id: doc.id });
  });
  dispatch({
    type: "updateGoalsEntries",
    payload: {
      goalEntries,
    },
  });
};

export const markQuickEntryForDay = async (userId, goalId, data) => {
  const docRef = doc(db, "goals", userId, "top_three_goals", goalId);
  await updateDoc(docRef, {
    entries: data,
  });
};

export const saveNewGoal = async (userId, data) => {
  const docRef = collection(db, "goals", userId, "top_three_goals");
  const result = await addDoc(docRef, {
    ...data,
    createdAt: Timestamp.fromDate(new Date()),
  });
  return result.id;
};
