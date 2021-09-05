import React from "react";
import { Box, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  GoalStates,
  getGoalPromptDescription,
  getGoalTextFieldName,
} from "../../constants/NewGoalConstants";

const useStyles = makeStyles({
  customBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 3,
    wordBreak: "break",
    overflow: "hidden",
  },
});

export default function GoalEditor({
  data,
  errors,
  activeStep,
  handleOnTextFieldChange,
}) {
  const classes = useStyles();
  const renderTitle = () => (
    <Box height="200" textOverflow="ellipsis" overflow="hidden">
      <Typography variant="h1" noWrap>
        {activeStep === GoalStates.THREE_YEARS ? "New Goal" : data.goalName}
      </Typography>
    </Box>
  );

  const maybeRenderGoalNameTextField = () =>
    activeStep === GoalStates.THREE_YEARS && (
      <Box mt={1} mb={2}>
        <TextField
          fullWidth
          required
          label="Name"
          name="goalName"
          variant="outlined"
          placeholder="Give your goal a name"
          value={data.goalName}
          error={errors.goalName}
          onChange={handleOnTextFieldChange}
        />
      </Box>
    );

  const mayRenderPreviousGoalDescription = () => {
    let content;
    switch (activeStep) {
      case GoalStates.THREE_YEARS:
        return;
      case GoalStates.TWELVE_MONTHS:
        content = data.threeYearsGoalDescription;
        break;
      case GoalStates.THREE_MONTHS:
        content = data.twelveMonthsGoalDescription;
        break;
      default:
        return;
    }
    return (
      <Box
        classes={{ root: classes.customBox }}
        mt={1}
        component="div"
        color="text.secondary"
      >
        <Typography variant="body1">{content}</Typography>
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="column" mr={2} ml={2} mb={4} mt={2}>
      <Box mb={2}>
        {renderTitle()}
        {mayRenderPreviousGoalDescription()}
      </Box>
      {maybeRenderGoalNameTextField()}
      <Box mt={2} mb={2}>
        <TextField
          fullWidth
          multiline
          required
          minRows={10}
          name={getGoalTextFieldName(activeStep)}
          label={getGoalPromptDescription(activeStep)}
          variant="outlined"
          value={data[getGoalTextFieldName(activeStep)] || ""}
          error={errors[getGoalTextFieldName(activeStep)] || false}
          onChange={handleOnTextFieldChange}
        />
      </Box>
    </Box>
  );
}
