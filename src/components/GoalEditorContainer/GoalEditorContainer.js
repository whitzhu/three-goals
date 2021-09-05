import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GoalEditor from "../NewGoalFlow/GoalEditor";
import { GoalStates, getStepperTitle } from "../../constants/NewGoalConstants";
import { StyledButton } from "../StyledButton/StyledButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Box, Divider, IconButton } from "@material-ui/core";

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
  const steps = [
    GoalStates.THREE_YEARS,
    GoalStates.TWELVE_MONTHS,
    GoalStates.THREE_MONTHS,
  ];

  const getActiveStepState = () => steps[activeStepIndex];

  const handleNext = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex((prevActiveStepIndex) => prevActiveStepIndex + 1);
    }
  };

  const handleBack = () => {
    setActiveStepIndex((prevActiveStepIndex) => prevActiveStepIndex - 1);
  };

  const handleReset = () => {
    setActiveStepIndex(0);
  };

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStepIndex}
        connector={<QontoConnector />}
      >
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              {getStepperTitle(step)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Divider />
      <div>
        <Typography className={classes.instructions}>
          <GoalEditor
            user={user}
            activeStep={getActiveStepState()}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        </Typography>
        {/* <div>
          <Button
            disabled={activeStepIndex === 0}
            onClick={handleBack}
            className={classes.button}
          >
            Back
          </Button>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleNext}
            className={classes.button}
          >
            {activeStepIndex === steps.length - 1 ? "Finish" : "Next"}
          </StyledButton>
        </div> */}
      </div>
    </div>
  );
}
