export const GoalStates = {
  THREE_YEAR: "GOAL_STATE_THREE_YEAR",
  TWELVE_MONTHS: "GOAL_STATE_TWELVE_MONTHS",
  THREE_MONTHS: "GOAL_STATE_THREE_MONTHS",
};

export const getStepperTitle = (step) => {
  switch (step) {
    case GoalStates.THREE_YEAR:
      return "3 Years";
    case GoalStates.TWELVE_MONTHS:
      return "12 Months";
    case GoalStates.THREE_MONTHS:
      return "3 Months";
    default:
      return "";
  }
};

export const getGoalPromptDescription = (state) => {
  switch (state) {
    case GoalStates.THREE_YEAR:
      return "What is one goal you would like to accomplish in the next 3 years?";
    case GoalStates.TWELVE_MONTHS:
      return "What do I need to do in the next 12 months  to  accomplish this  goal in 3 years?";
    case GoalStates.THREE_MONTHS:
      return "What do I need to do in the next 3 months  to  accomplish goals set for next 12 months?";
    default:
      return "";
  }
};

export const getGoalTextFieldName = (state) => {
  switch (state) {
    case GoalStates.THREE_YEAR:
      return "threeYearGoalDescription";
    case GoalStates.TWELVE_MONTHS:
      return "twelveMonthsGoalDescription";
    case GoalStates.THREE_MONTHS:
      return "threeMonthsGoalDescription";
    default:
      return "";
  }
};
