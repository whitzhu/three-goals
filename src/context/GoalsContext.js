import React, { useReducer, createContext } from "react";

export const GoalsContext = createContext();

export const GoalsContextProvider = (props) => {
  const DEFAULT_GOALS_DATA_STATE = {
    newGoal: {
      goalName: "",
      threeYearsGoalDescription: "",
    },
  };

  function goalReducer(state, action) {
    switch (action.type) {
      case "updateNewGoal":
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
