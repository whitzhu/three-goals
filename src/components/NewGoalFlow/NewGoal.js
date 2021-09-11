import React, { useContext, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";
import { saveThreeYearGoal } from "../../firebase/firebaseGoalHelper";
import { GoalsContext } from "../../context/GoalsContext";
import {
  GoalStates,
  getGoalPromptDescription,
  getGoalTextFieldName,
} from "../../constants/NewGoalConstants";
import GoalStepper from "../GoalStepper/GoalStepper";

export default function NewGoal({ user }) {
  const [localGoalData, setLocalGoalData] = useState({
    goalName: "",
    threeYearsGoalDescription: "",
  });
  const [errors, setErrors] = useState({});
  const [goalsData, dispatch] = useContext(GoalsContext);
  const [goalState, setGoalState] = useState(GoalStates.THREE_YEARS);

  const handleOnTextFieldChange = (e) => {
    setLocalGoalData({
      ...localGoalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnNextClick = () => {
    const { goalName, threeYearsGoalDescription } = localGoalData;
    if (validateData()) {
      dispatch({
        type: "updateNewGoal",
        payload: {
          newGoal: {
            ...goalsData.newGoal,
            goalName,
            threeYearsGoalDescription,
          },
        },
      });
      setGoalState(GoalStates.TWELVE_MONTHS);
      saveThreeYearGoal(user.uid, goalName, threeYearsGoalDescription);
    }
  };

  const validateData = () => {
    const newErrors = {};
    let hasError = false;
    Object.keys(localGoalData).map((key) => {
      const isEmpty = localGoalData[key] === "";
      newErrors[key] = isEmpty;
      if (isEmpty) {
        hasError = true;
      }
    });
    setErrors(newErrors);
    return !hasError;
  };

  const renderGoalNameTextField = () => (
    <Box mb={2}>
      <TextField
        fullWidth
        required
        label="Name"
        name="goalName"
        variant="outlined"
        placeholder="Give your goal a name"
        value={localGoalData.goalName}
        error={errors.goalName}
        onChange={handleOnTextFieldChange}
      />
    </Box>
  );
  return (
    <Box display="flex" flexDirection="column" mr={2} ml={2} mt={4} mb={4}>
      <GoalStepper />
      <Box mb={4}>
        <Box mb={1}>
          <Typography variant="h1">
            {goalState === GoalStates.THREE_YEARS
              ? "New Goal"
              : goalsData.goalName}
          </Typography>
        </Box>
        <Typography variant="subtitle1">
          {getGoalPromptDescription(goalState)}
        </Typography>
      </Box>
      {goalState === GoalStates.THREE_YEARS && renderGoalNameTextField()}
      <Box mb={2}>
        <TextField
          fullWidth
          multiline
          required
          minRows={10}
          name={getGoalTextFieldName(goalState)}
          label="Description"
          variant="outlined"
          placeholder="Describe your goal and why is this important"
          value={localGoalData.threeYearsGoalDescription}
          error={errors.threeYearsGoalDescription}
          onChange={handleOnTextFieldChange}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        position="fixed"
        flexGrow="1"
        right="0"
        bottom="0"
        width={1}
        bgcolor="#fff"
      >
        <Divider />
        <Box m={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleOnNextClick}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
