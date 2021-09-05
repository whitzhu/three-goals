import { Box, Paper, Typography } from "@material-ui/core";

export default function GoalConfirmation() {
  return (
    <Box pr={2} pl={2}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4">You've added your first goal</Typography>
      </Box>
      <Paper variant="outlined">
        <Box m={2}>
          <Typography variant="h1">Goal</Typography>
          <Typography variant="h5">3 Years</Typography>
          <Typography variant="h5">12 Months</Typography>
          <Typography variant="h5">3 Months</Typography>
        </Box>
      </Paper>
    </Box>
  );
}
