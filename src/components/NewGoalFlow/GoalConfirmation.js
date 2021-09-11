import React, { useContext } from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { GoalsContext } from "../../context/GoalsContext";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  customBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 3,
    wordBreak: "break",
    overflow: "hidden",
  },
});

export default function GoalConfirmation() {
  const classes = useStyles();
  const [{ newGoal }] = useContext(GoalsContext);
  return (
    <Box pt={4} pr={2} pl={2} pb={10}>
      <Box component="div" textAlign="center" mb={4}>
        <Box mb={2}>
          <CheckCircleOutline fontSize="large" />
        </Box>
        <Typography variant="h4">You've added your first goal</Typography>
      </Box>
      <Paper component="div" variant="outlined">
        <Box m={2}>
          <Box component="div" mb={2}>
            <Typography variant="h1">{newGoal.goalName}</Typography>
          </Box>
          <Box component="div" mb={2}>
            <Typography variant="h5">3 Years</Typography>
            <Box
              classes={{ root: classes.customBox }}
              component="div"
              color="text.secondary"
            >
              <Typography variant="body1">
                {newGoal.threeYearsGoalDescription}
              </Typography>
            </Box>
          </Box>
          <Box component="div" mb={2}>
            <Typography variant="h5">12 Months</Typography>
            <Box
              classes={{ root: classes.customBox }}
              component="div"
              color="text.secondary"
            >
              <Typography variant="body1">
                {newGoal.twelveMonthsGoalDescription}
              </Typography>
            </Box>
          </Box>
          <Box component="div" mb={2}>
            <Typography variant="h5">3 Months</Typography>
            <Box
              classes={{ root: classes.customBox }}
              component="div"
              color="text.secondary"
            >
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
