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
  const goals = [];
  querySnapshot.forEach((doc) => {
    goals.push({ ...doc.data(), id: doc.id });
  });
  dispatch({
    type: "updateGoalsList",
    payload: {
      goals,
    },
  });
};

export const fetchAllEntries = async (userId, dispatch) => {
  const docRef = doc(db, "goals", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && docSnap.data()) {
    dispatch({
      type: "updateEntriesList",
      payload: {
        ...docSnap.data(),
      },
    });
  } else {
    console.log("No such document!");
  }
};

export const markQuickEntryForDay = async (
  dispatch,
  userId,
  date,
  goalId,
  hasEntry
) => {
  const docRef = doc(db, "goals", userId);
  await updateDoc(docRef, {
    [`entries.${date}.${goalId}.hasEntry`]: hasEntry,
  });
  dispatch({
    type: "updateHasEntry",
    payload: {
      date,
      goalId,
      hasEntry,
    },
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

export const saveWeekEntry = async (userId, week, goalId, entry) => {
  const docRef = doc(db, "goals", userId);
  await updateDoc(docRef, {
    [`entries.${week}.${goalId}.entry`]: entry,
  });
};
