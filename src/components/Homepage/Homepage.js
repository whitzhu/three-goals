import { Box, Typography } from "@material-ui/core";

export default function Homepage() {
  const date = new Date();
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box textAlign="center">
        <Typography variant="h2">
          {new Intl.DateTimeFormat("en-US", {
            weekday: "long",
          }).format(date)}
        </Typography>
        <Typography variant="h5">
          {date.toLocaleDateString("en-US", options)}
        </Typography>
      </Box>
    </Box>
  );
}
