import React, { useContext, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";
import { saveThreeYearGoal } from "../../firebase/firebaseGoalHelper";
import { GoalsContext } from "../../context/GoalsContext";
import {
  GoalStates,
  getGoalPromptDescription,
  getGoalTextFieldName,
} from "../../constants/NewGoalConstants";

export default function GoalEditor({
  user,
  activeStep,
  handleNext,
  handleBack,
}) {
  const [localGoalData, setLocalGoalData] = useState({
    goalName: "",
    threeYearsGoalDescription: "",
    twelveMonthsGoalDescription: "",
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
    if (validateData()) {
      handleNext();
    }
  };

  // const handleOnNextClick = () => {
  //   const { goalName, threeYearsGoalDescription } = localGoalData;
  //   if (validateData()) {
  //     dispatch({
  //       type: "updateNewGoal",
  //       payload: {
  //         newGoal: {
  //           ...goalsData.newGoal,
  //           goalName,
  //           threeYearsGoalDescription,
  //         },
  //       },
  //     });
  //     console.log("saveThreeYearGoal");
  //     handleNext();
  //     // saveThreeYearGoal(user.uid, goalName, threeYearsGoalDescription);
  //   }
  // };

  const validateData = () => {
    const newErrors = {};
    let hasError = false;
    if (localGoalData.goalName === "") {
      newErrors["goalName"] = true;
      hasError = true;
    }
    const descriptionText = localGoalData[getGoalTextFieldName(activeStep)];
    if (!descriptionText || descriptionText === "") {
      newErrors[getGoalTextFieldName(activeStep)] = true;
      hasError = true;
    }
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

  const maybeRenderBackButton = () =>
    activeStep !== GoalStates.THREE_YEARS && (
      <Box pr={2} flexGrow="1">
        <Button fullWidth size="large" color="primary" onClick={handleBack}>
          Back
        </Button>
      </Box>
    );

  const mayRenderPreviousGoalDescription = () => {
    if (activeStep === GoalStates.THREE_YEARS) {
      return;
    }

    let content;
    if (activeStep === GoalStates.TWELVE_MONTHS) {
      content = localGoalData.threeYearsGoalDescription;
    } else if (activeStep === GoalStates.THREE_MONTHS) {
      content = localGoalData.threeMonthGoalDescription;
    }
    return (
      <Typography colo variant="subtitle1">
        {content}
      </Typography>
    );
  };

  return (
    <Box display="flex" flexDirection="column" mr={2} ml={2} mb={4} mt={2}>
      <Box mb={4}>
        <Box mb={1} height="200" textOverflow="ellipsis" overflow="hidden">
          <Typography variant="h1" noWrap>
            {activeStep === GoalStates.THREE_YEARS
              ? "New Goal"
              : localGoalData.goalName}
          </Typography>
        </Box>
        {mayRenderPreviousGoalDescription()}
      </Box>
      {activeStep === GoalStates.THREE_YEARS && renderGoalNameTextField()}
      <Box mb={2}>
        <TextField
          fullWidth
          multiline
          required
          minRows={10}
          name={getGoalTextFieldName(activeStep)}
          label={getGoalPromptDescription(activeStep)}
          variant="outlined"
          value={localGoalData[getGoalTextFieldName(activeStep)] || ""}
          error={errors[getGoalTextFieldName(activeStep)] || false}
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
