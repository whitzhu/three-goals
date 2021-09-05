import React, { useContext } from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { GoalsContext } from "../../context/GoalsContext";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";

export default function GoalConfirmation() {
  const [{ newGoal }] = useContext(GoalsContext);
  return (
    <Box pt={4} pr={2} pl={2}>
      <Box textAlign="center" mb={4}>
        <CheckCircleOutline fontSize="large" />
        <Typography variant="h4">You've added your first goal</Typography>
      </Box>
      <Paper variant="outlined">
        <Box m={2}>
          <Box mb={2} textAlign="center">
            <Typography variant="h1">{newGoal.goalName}</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h5">3 Years</Typography>
            <Box color="text.secondary">
              <Typography variant="body1">
                {newGoal.threeYearsGoalDescription}
              </Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography variant="h5">12 Months</Typography>
            <Box color="text.secondary">
              <Typography variant="body1">
                {newGoal.twelveMonthsGoalDescription}
              </Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography variant="h5">3 Months</Typography>
            <Box color="text.secondary">
              <Typography variant="body1">
                {newGoal.threeMonthsGoalDescription}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
