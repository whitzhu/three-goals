import React, { useContext, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  fetchAllGoals,
  markQuickEntryForDay,
} from "../../firebase/firebaseGoalHelper";
import { GoalsContext } from "../../context/GoalsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 50px)",
    alignItems: "stretch",
  },
  button: {
    padding: 0,
    margin: 0,
    width: "100%",
    color: "#fff",
    textAlign: "center",
    "& .MuiButton-label": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default function Homepage({ user }) {
  const classes = useStyles();
  const [{ goalEntries }, dispatch] = useContext(GoalsContext);
  const date = new Date();
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  useEffect(() => {
    async function fetchGoal() {
      try {
        await fetchAllGoals(user.uid, dispatch);
      } catch (e) {
        console.error("Fetch All Goals Error:", e);
      }
    }

    fetchGoal();
  }, [user]);

  const handleQuickGoalMaker = (goalId) => {
    const shortDate = date.toLocaleDateString("en-US"); // format: MM/DD/YYYY
    markQuickEntryForDay(user.uid, goalId, {
      [shortDate]: {
        [goalId]: {
          hasEntry: true,
        },
      },
    });
  };

  const renderQuickGoalMarker = (goal) => (
    <Grid item xs={6}>
      <Button
        className={classes.button}
        onClick={() => handleQuickGoalMaker(goal.id)}
      >
        <Box p={5}>{goal.goalName}</Box>
      </Button>
    </Grid>
  );

  return (
    <div className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        textAlign="center"
        justifyContent="center"
        flexGrow="1"
      >
        <Typography variant="h2">
          {new Intl.DateTimeFormat("en-US", {
            weekday: "long",
          }).format(date)}
        </Typography>
        <Typography variant="h5">
          {date.toLocaleDateString("en-US", options)}
        </Typography>
      </Box>
      <Box display="flex">
        <Grid container spacing={1}>
          {goalEntries &&
            goalEntries.length > 0 &&
            goalEntries.map((goal) => renderQuickGoalMarker(goal))}
        </Grid>
      </Box>
    </div>
  );
}
