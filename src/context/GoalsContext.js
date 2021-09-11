import React, { useReducer, createContext } from "react";

export const GoalsContext = createContext();

export const GoalsContextProvider = (props) => {
  const DEFAULT_GOALS_DATA_STATE = {
    newGoal: {
      goalName: "",
      threeYearsGoalDescription: "",
      twelveMonthsGoalDescription: "",
      threeMonthsGoalDescription: "",
    },
    goals: [],
    entries: {},
  };

  function goalReducer(state, action) {
    switch (action.type) {
      case "updateNewGoal":
        return {
          ...state,
          newGoal: {
            ...state.newGoal,
            ...action.payload,
          },
        };
      case "updateGoalsList":
        return {
          ...state,
          ...action.payload,
        };
      case "updateEntriesList":
        return {
          ...state,
          entries: {
            ...state.entries,
            ...action.payload,
          },
        };
      case "updateHasEntry":
        const { date, goalId, hasEntry } = action.payload;
        return {
          ...state,
          entries: {
            ...state.entries,
            [date]: {
              [goalId]: {
                ...state.entries[date]?.[goalId],
                hasEntry,
              },
            },
          },
        };
      default:
        throw new Error();
    }
  }

  const [goalsData, dispatch] = useReducer(
    goalReducer,
    DEFAULT_GOALS_DATA_STATE
  );

  return (
    <GoalsContext.Provider value={[goalsData, dispatch]}>
      {props.children}
    </GoalsContext.Provider>
  );
};
