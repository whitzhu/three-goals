import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider, Typography, Button } from "@material-ui/core";

import GoalEditor from "./GoalEditor";
import {
  GoalStates,
  getGoalTextFieldName,
  NewGoalStepsOrder,
} from "../../constants/NewGoalConstants";
import GoalConfirmation from "./GoalConfirmation";
import { GoalsContext } from "../../context/GoalsContext";
import NewGoalStepper from "./NewGoalStepper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function GoalEditorContainer({ user }) {
  const classes = useStyles();
  const [activeStepIndex, setActiveStepIndex] = React.useState(1);
  const [errors, setErrors] = useState({});
  const [{ newGoal }, dispatch] = useContext(GoalsContext);

  const getActiveStepState = () => NewGoalStepsOrder[activeStepIndex];

  const handleOnTextFieldChange = (e) => {
    dispatch({
      type: "updateNewGoal",
      payload: {
        ...newGoal,
        [e.target.name]: e.target.value,
      },
    });
  };

  const validateData = () => {
    const newErrors = {};
    let hasError = false;
    if (newGoal.goalName === undefined || newGoal.goalName === "") {
      newErrors["goalName"] = true;
      hasError = true;
    }
    const descriptionText = newGoal[getGoalTextFieldName(getActiveStepState())];
    if (descriptionText === undefined || descriptionText === "") {
      newErrors[getGoalTextFieldName(getActiveStepState())] = true;
      hasError = true;
    }
    setErrors(newErrors);
    return !hasError;
  };

  const handleNext = () => {
    if (validateData()) {
      setActiveStepIndex((prevActiveStepIndex) => prevActiveStepIndex + 1);
    }
  };

  const handleBack = () => {
    setActiveStepIndex((prevActiveStepIndex) => prevActiveStepIndex - 1);
  };

  const getContent = () => {
    switch (getActiveStepState()) {
      case GoalStates.SETUP_CONFIRMATION:
        return <GoalConfirmation />;
      case GoalStates.THREE_YEARS:
      case GoalStates.TWELVE_MONTHS:
      case GoalStates.THREE_MONTHS:
      default:
        return (
          <GoalEditor
            data={newGoal}
            errors={errors}
            activeStep={getActiveStepState()}
            handleOnTextFieldChange={handleOnTextFieldChange}
          />
        );
    }
  };

  const renderBottomButtons = () => (
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
        <Divider />
        {maybeRenderBackButton()}
        <Box flexGrow="1">
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {getActiveStepState === GoalStates.THREE_MONTHS ? "Save" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );

  const maybeRenderBackButton = () =>
    getActiveStepState() !== GoalStates.THREE_YEARS && (
      <Box pr={2} flexGrow="1">
        <Button fullWidth size="large" color="primary" onClick={handleBack}>
          Back
        </Button>
      </Box>
    );

  return (
    <div className={classes.root}>
      <NewGoalStepper activeStepIndex={activeStepIndex} />
      <Divider />
      <div>
        <Typography className={classes.instructions}>{getContent()}</Typography>
        {renderBottomButtons()}
      </div>
    </div>
  );
}
