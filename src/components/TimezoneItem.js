import React from "react";
import { Box, TextField, Slider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment-timezone";
import { timezoneOptions } from "../utils/timezoneOptions";

function TimezoneItem({ id, sliderValue, onDelete, onSliderChange, timezone }) {
  // Handle slider value changes
  const handleSliderChange = (event, newValue) => {
    onSliderChange(id, newValue);
  };

  // Calculate and format the current time, date, and day based on slider value and timezone
  const calculateTime = (sliderValue, timezone) => {
    try {
      // Ensure timezone is valid
      if (!moment.tz.zone(timezone)) {
        throw new Error(`Invalid timezone: ${timezone}`);
      }

      const now = moment()
        .tz(timezone)
        .startOf("day")
        .add(sliderValue, "minutes");
      return {
        time: now.format("h:mm a"),
        date: now.format("YYYY-MM-DD"),
        day: now.format("dddd"),
      };
    } catch (error) {
      console.error(`Error calculating time for timezone ${timezone}:`, error);
      return {
        time: "Invalid Timezone",
        date: "",
        day: "",
      };
    }
  };

  const { time, date, day } = calculateTime(sliderValue, timezone);

  // Get the timezone abbreviation
  const getTimezoneAbbreviation = (timezone) => {
    const timezoneOption = timezoneOptions.find(
      (option) => option.tz === timezone
    );
    return timezoneOption ? timezoneOption.tz : "N/A"; // Return 'N/A' if no match
  };

  const timezoneAbbreviation = getTimezoneAbbreviation(timezone);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      p={2}
      border={1}
      borderRadius={4}
      mb={2}
      sx={{ width: "100%", maxWidth: 800, position: "relative" }}
    >
      {/* Close Icon */}
      <CloseIcon
        onClick={() => onDelete(id)}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          cursor: "pointer",
          color: "text.secondary",
          fontSize: 24, // Adjust size to be more visible
        }}
      />

      {/* First Line: Timezone Abbreviation and Time */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        {/* Timezone Abbreviation */}
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {timezoneAbbreviation}
        </Typography>

        {/* Time Display */}
        <TextField
          disabled
          variant="outlined"
          size="small"
          value={time}
          sx={{
            width: "100px",
            textAlign: "center",
          }}
        />
      </Box>

      {/* Second Line: Slider and Date & Day */}
      <Box display="flex" alignItems="center" sx={{ width: "100%", mt: 1 }}>
        {/* Slider */}
        <Slider
          value={sliderValue}
          onChange={handleSliderChange}
          min={0}
          max={24 * 60 - 1} // Range in minutes (0 to 1439 minutes)
          step={1}
          valueLabelDisplay="auto"
          sx={{ flex: 1, mr: 2 }}
        />

        {/* Date and Day Display */}
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Typography variant="body2">{date}</Typography>
          <Typography variant="body2">{day}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default TimezoneItem;
