import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useState } from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 24,
    marginRight: 12,
    marginLeft: 12,
  },
  calendarBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexGrow: 1,
    margin: 2,
  },
  calendarItem: {
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  dayOfWeek: {
    color: theme.palette.secondary.dark,
  },
  calendarDay: {
    marginTop: 8,
    width: 32,
    height: 32,
    cursor: "pointer",
  },
  currentDay: {
    backgroundColor: theme.palette.secondary.dark,
    color: "white",
    borderRadius: "50%",
  },
  selectedDay: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    borderRadius: "50%",
  },
}));

export default function HeaderCalendar() {
  const classes = useStyles();
  const today = moment();
  const [selectedDate, setSelectedDate] = useState(moment());
  const listOfDays = [];
  const from_date = today.startOf("week");

  for (let i = 0; i < 7; i++) {
    listOfDays.push(moment(from_date, "DD-MM-YYYY").add(i, "d"));
  }

  const handleDayClicked = (day) => {
    console.log("day", day);
    setSelectedDate(day);
  };

  return (
    <div className={classes.root}>
      <Box display="flex" flexDirection="row" justifyContent="center">
        {moment.weekdaysShort().map((dayOfWeek, index) => {
          const day = listOfDays[index];
          return (
            <div className={classes.calendarBox}>
              <div className={clsx(classes.calendarItem, classes.dayOfWeek)}>
                {dayOfWeek}
              </div>
              <div
                className={clsx(classes.calendarItem, classes.calendarDay, {
                  [classes.currentDay]: moment(day).isSame(moment(), "day"),
                  [classes.selectedDay]: moment(day).isSame(
                    selectedDate,
                    "day"
                  ),
                })}
                onClick={() => handleDayClicked(day)}
              >
                {day.date()}
              </div>
            </div>
          );
        })}
      </Box>
    </div>
  );
}
