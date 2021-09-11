import React, { useContext, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  fetchAllGoals,
  fetchAllEntries,
  markQuickEntryForDay,
} from "../../firebase/firebaseGoalHelper";
import { GoalsContext } from "../../context/GoalsContext";
import HeaderCalendar from "../HeaderCalendar/HeaderCalendar";

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
  isCompleted: {
    "& .MuiButton-label": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

export default function Homepage({ user }) {
  const classes = useStyles();
  const [{ goals, entries }, dispatch] = useContext(GoalsContext);
  const date = new Date();
  const entryDate = date.toISOString().split("T")[0]; // format: YYYY-MM-DD

  useEffect(() => {
    async function fetchGoal() {
      try {
        await fetchAllGoals(user.uid, dispatch);
        await fetchAllEntries(user.uid, dispatch);
      } catch (e) {
        console.error("Fetch All Goals Error:", e);
      }
    }

    fetchGoal();
  }, [user]);

  const handleQuickGoalMaker = async (goalId, hasEntry) => {
    await markQuickEntryForDay(
      dispatch,
      user.uid,
      entryDate,
      goalId,
      !hasEntry
    );
  };

  const renderQuickGoalMarker = (goal) => {
    const hasEntry = entries[entryDate]?.[goal.id]?.hasEntry || false;
    return (
      <Grid item xs={6}>
        <Button
          className={clsx(classes.button, {
            [classes.isCompleted]: hasEntry,
          })}
          onClick={() => handleQuickGoalMaker(goal.id, hasEntry)}
        >
          <Box p={5}>{goal.goalName}</Box>
        </Button>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <HeaderCalendar />
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
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Typography>
      </Box>
      <Box display="flex">
        <Grid container spacing={1}>
          {goals &&
            goals.length > 0 &&
            goals.map((goal) => renderQuickGoalMarker(goal))}
        </Grid>
      </Box>
    </div>
  );
}
