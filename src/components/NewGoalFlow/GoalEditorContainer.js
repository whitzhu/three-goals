import React, { useContext, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GoalEditor from "./GoalEditor";
import {
  GoalStates,
  getStepperTitle,
  getGoalPromptDescription,
  getGoalTextFieldName,
} from "../../constants/NewGoalConstants";
import { Box, Divider } from "@material-ui/core";
import GoalConfirmation from "./GoalConfirmation";
import { GoalsContext } from "../../context/GoalsContext";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#263238",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#263238",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#263238",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#263238",
    zIndex: 1,
    fontSize: 18,
  },
});

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

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

export default function GoalEditorContainer({ user }) {
  const classes = useStyles();
  const [activeStepIndex, setActiveStepIndex] = React.useState(1);
  const [errors, setErrors] = useState({});
  const [{ newGoal }, dispatch] = useContext(GoalsContext);
  const steps = [
    GoalStates.THREE_YEARS,
    GoalStates.TWELVE_MONTHS,
    GoalStates.THREE_MONTHS,
    GoalStates.SETUP_CONFIRMATION,
  ];
  const stepperSteps = steps.slice(0, 3);
  const getActiveStepState = () => steps[activeStepIndex];

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
            user={user}
            data={newGoal}
            errors={errors}
            activeStep={getActiveStepState()}
            handleNext={handleNext}
            handleBack={handleBack}
            handleOnTextFieldChange={handleOnTextFieldChange}
          />
        );
    }
  };

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
      <Stepper
        alternativeLabel
        activeStep={activeStepIndex}
        connector={<QontoConnector />}
      >
        {stepperSteps.map((step) => (
          <Step key={step}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              {getStepperTitle(step)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Divider />
      <div>
        <Typography className={classes.instructions}>{getContent()}</Typography>
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
                {getActiveStepState === GoalStates.THREE_MONTHS
                  ? "Save"
                  : "Next"}
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}
