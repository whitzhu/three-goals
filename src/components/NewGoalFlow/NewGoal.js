import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";
import { saveThreeYearGoal } from "../../firebase/firebaseGoalHelper";

export default function NewGoal({ user }) {
  const handleOnNextClick = () => {
    saveThreeYearGoal(user.uid, "Move to NYC", "Life Is Great");
  };

  return (
    <Box display="flex" flexDirection="column" mr={2} ml={2} mt={4} mb={4}>
      <Box mb={2}>
        <Box mb={1}>
          <Typography variant="h1">Goal #1</Typography>
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
          variant="outlined"
          placeholder="Give your goal a name"
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          multiline
          required
          minRows={10}
          label="Description"
          variant="outlined"
          placeholder="Describe your goal and why is this important"
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
