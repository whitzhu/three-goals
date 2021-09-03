import React, { useContext, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";
import { saveThreeYearGoal } from "../../firebase/firebaseGoalHelper";
import { GoalsContext } from "../../context/GoalsContext";
import {
  GoalStates,
  getGoalPromptDescription,
  getGoalTextFieldName,
} from "../../constants/NewGoalConstants";
import { StyledButton } from "../StyledButton/StyledButton";

export default function GoalEditor({
  user,
  activeStep,
  handleNext,
  handleBack,
}) {
  const [localGoalData, setLocalGoalData] = useState({
    goalName: "",
    threeYearGoalDescription: "",
    twelveMonthGoalDescription: "",
    threeMonthGoalDescription: "",
    goalId: "",
  });

  const [errors, setErrors] = useState({});
  const [goalsData, dispatch] = useContext(GoalsContext);

  const handleOnTextFieldChange = (e) => {
    setLocalGoalData({
      ...localGoalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnNextClick = () => {
    handleNext();
  };

  // const handleOnNextClick = () => {
  //   const { goalName, threeYearGoalDescription } = localGoalData;
  //   if (validateData()) {
  //     dispatch({
  //       type: "updateNewGoal",
  //       payload: {
  //         newGoal: {
  //           ...goalsData.newGoal,
  //           goalName,
  //           threeYearGoalDescription,
  //         },
  //       },
  //     });
  //     console.log("saveThreeYearGoal");
  //     handleNext();
  //     // saveThreeYearGoal(user.uid, goalName, threeYearGoalDescription);
  //   }
  // };

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

  // const validateData = () => {
  //   const newErrors = {};
  //   let hasError = false;
  //   Object.keys(localGoalData).map((key) => {
  //     const isEmpty = localGoalData[key] === "";
  //     newErrors[key] = isEmpty;
  //     if (isEmpty) {
  //       hasError = true;
  //     }
  //   });
  //   setErrors(newErrors);
  //   return !hasError;
  // };

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

  const maybeRenderBackButton = () =>
    activeStep !== GoalStates.THREE_YEAR && (
      <Box pr={2} flexGrow="1">
        <Button fullWidth size="large" color="primary" onClick={handleBack}>
          Back
        </Button>
      </Box>
    );

  return (
    <Box display="flex" flexDirection="column" mr={2} ml={2} mb={4}>
      <Box mb={4}>
        <Box mb={1} height="200" textOverflow="ellipsis" overflow="hidden">
          <Typography variant="h1" noWrap>
            {activeStep === GoalStates.THREE_YEAR
              ? "New Goal"
              : localGoalData.goalName}
          </Typography>
        </Box>
        <Typography variant="subtitle1">
          {getGoalPromptDescription(activeStep)}
        </Typography>
      </Box>
      {activeStep === GoalStates.THREE_YEAR && renderGoalNameTextField()}
      <Box mb={2}>
        <TextField
          fullWidth
          multiline
          required
          minRows={10}
          name={getGoalTextFieldName(activeStep)}
          label="Describe"
          variant="outlined"
          placeholder="Describe your goal and why is this important"
          value={localGoalData[getGoalTextFieldName(activeStep)] || ""}
          error={errors.threeYearGoalDescription}
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
        <Box m={2} display="flex">
          {maybeRenderBackButton()}
          <Box flexGrow="1">
            <Button
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              onClick={handleOnNextClick}
            >
              {activeStep === GoalStates.THREE_MONTHS ? "Save" : "Next"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
