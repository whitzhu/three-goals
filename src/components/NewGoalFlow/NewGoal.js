import React, { useContext, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";
import { saveThreeYearGoal } from "../../firebase/firebaseGoalHelper";
import { GoalsContext } from "../../context/GoalsContext";

export default function NewGoal({ user }) {
  const [localGoalData, setLocalGoalData] = useState({
    goalName: "",
    threeYearGoalDescription: "",
  });
  const [goalsData, dispatch] = useContext(GoalsContext);

  const handleOnTextFieldChange = (e) => {
    setLocalGoalData({
      ...localGoalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnNextClick = () => {
    const { goalName, threeYearGoalDescription } = localGoalData;
    dispatch({
      type: "updateNewGoal",
      payload: {
        newGoal: {
          ...goalsData.newGoal,
          goalName,
          threeYearGoalDescription,
        },
      },
    });
    saveThreeYearGoal(user.uid, goalName, threeYearGoalDescription);
  };

  return (
    <Box display="flex" flexDirection="column" mr={2} ml={2} mt={4} mb={4}>
      <Box mb={2}>
        <Box mb={1}>
          <Typography variant="h1">New Goal</Typography>
        </Box>
        <Typography variant="subtitle1">
          What is one goal you would like to accomplish in the next 3 years?
        </Typography>
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          required
          label="Name"
          name="goalName"
          variant="outlined"
          placeholder="Give your goal a name"
          value={localGoalData.goalName}
          onChange={handleOnTextFieldChange}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          multiline
          required
          minRows={10}
          name="threeYearGoalDescription"
          label="Description"
          variant="outlined"
          placeholder="Describe your goal and why is this important"
          value={localGoalData.threeYearGoalDescription}
          onChange={handleOnTextFieldChange}
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
        <Divider />
        <Box m={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleOnNextClick}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
