import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { GoalsContext } from "../../context/GoalsContext";
import { saveWeekEntry } from "../../firebase/firebaseGoalHelper";
import { AuthContext } from "../../context/AuthContext";

export default function GoalWeekEntry() {
  const { goalId } = useParams();
  const [{ goals, entries }] = useContext(GoalsContext);
  const [{ user }] = useContext(AuthContext);
  const [currentGoal, setCurrentGoal] = useState();
  const [currentEntries, setCurrentEntries] = useState();
  const [weekEntry, setWeekEntry] = useState();
  const today = moment();
  const startDate = moment(today.startOf("week")).format("MMM DD, YY");
  const endDate = moment(today.endOf("week")).format("MMM DD, YY");
  var weekRange = `${startDate} - ${endDate}`;

  useEffect(() => {
    console.log("goals", goals);
    for (let i = 0; i < goals.length; i++) {
      console.log("goals[i]?.id", goals[i]);
      if (goals[i]?.id === goalId) {
        setCurrentGoal(goals[i]);
        break;
      }
    }
    console.log("currentGoal", currentGoal);
  }, []);

  const handleOnClick = async () => {
    await saveWeekEntry(user.uid, weekRange, goalId, weekEntry);
  };

  return (
    <div>
      <Box mb={1} textAlign="center">
        <Typography variant="h5">{currentGoal?.goalName}</Typography>
      </Box>
      <Box p={2}>
        <Box mb={1}>
          <Typography variant="h5">3 Months Goal</Typography>
        </Box>
        <Box>{currentGoal?.threeMonthsGoalDescription}</Box>
      </Box>
      <Divider />
      <Box p={2}>
        <Box mb={1}>
          <Typography variant="h5">{`This Week | ${weekRange}`}</Typography>
        </Box>
        <TextField
          fullWidth
          multiline
          variant="outlined"
          minRows={10}
          onChange={(e) => {
            setWeekEntry(e.target.value);
          }}
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
        <Box m={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleOnClick}
          >
            Save
          </Button>
        </Box>
      </Box>
    </div>
  );
}
