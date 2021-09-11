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
    goalEntries: [],
  };

  function goalReducer(state, action) {
    console.log("goalReducer action.payload", action.payload);
    switch (action.type) {
      case "updateNewGoal":
        return {
          ...state,
          newGoal: {
            ...state.newGoal,
            ...action.payload,
          },
        };
      case "updateGoalsEntries":
        return {
          ...state,
          ...action.payload,
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
