import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, StepConnector } from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import clsx from "clsx";
import {
  getStepperTitle,
  NewGoalStepsOrder,
} from "../../constants/NewGoalConstants";

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

export default function NewGoalStepper({ activeStepIndex }) {
  const stepperSteps = NewGoalStepsOrder.slice(0, 3);
  return (
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
  );
}
