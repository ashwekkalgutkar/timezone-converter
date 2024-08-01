import React, { useState } from "react";
import { Grid, TextField, IconButton, Box } from "@mui/material";
import { Add as AddIcon, SwapVert as SwapVertIcon } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import TimezoneItem from "../components/TimezoneItem";
import Header from "../components/Header";
import { timezoneOptions } from "../utils/timezoneOptions";
import moment from "moment-timezone";

const HomePage = ({ darkMode, toggleDarkMode }) => {
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState(null);

  const handleAddTimezone = () => {
    if (selectedTimezone) {
      const now = moment().tz(selectedTimezone.tz);
      const sliderValue = now.hours() * 60 + now.minutes();

      setTimezones((prevTimezones) => [
        ...prevTimezones,
        {
          ...selectedTimezone,
          id: selectedTimezone.tz,
          sliderValue,
        },
      ]);
      setSelectedTimezone(null);
    }
  };

  const handleReverseOrder = () => {
    setTimezones((prevTimezones) => [...prevTimezones].reverse());
  };

  const handleDeleteTimezone = (id) => {
    setTimezones((prevTimezones) => prevTimezones.filter((tz) => tz.id !== id));
  };

  const handleSliderChange = (id, newValue) => {
    const referenceTimezone = timezones.find((tz) => tz.id === id);
    if (!referenceTimezone) return;

    try {
      // Reference time at the start of the day with new slider value
      const referenceTime = moment()
        .tz(referenceTimezone.tz)
        .startOf("day")
        .add(newValue, "minutes");

      // Update each timezone based on the difference from the reference time
      const updatedTimezones = timezones.map((tz) => {
        if (tz.id === id) {
          return { ...tz, sliderValue: newValue };
        }

        // Calculate time difference and adjust slider value
        const timezoneMoment = moment().tz(tz.tz).startOf("day");
        const offsetDifference = referenceTime.diff(timezoneMoment, "minutes");
        return {
          ...tz,
          sliderValue: tz.sliderValue + offsetDifference,
        };
      });

      setTimezones(updatedTimezones);
    } catch (error) {
      console.error("Error in handleSliderChange:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#fafafa",
        color: darkMode ? "#e0e0e0" : "#000",
        transition: "background-color 0.3s, color 0.3s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "70%", textAlign: "center" }}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Box
          sx={{
            mt: 3,
            mb: 3,
            p: 2,
            borderRadius: 1,
            boxShadow: 3,
            backgroundColor: darkMode ? "#424242" : "#fff",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Autocomplete
                options={timezoneOptions}
                getOptionLabel={(option) => `${option.tz} (${option.label})`}
                value={selectedTimezone}
                onChange={(event, newValue) => {
                  setSelectedTimezone(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add Time Zone, City or Town"
                    variant="outlined"
                    fullWidth
                    sx={{
                      backgroundColor: darkMode ? "#333" : "#fff",
                      color: darkMode ? "#e0e0e0" : "#000",
                      borderColor: darkMode ? "#444" : "#ccc",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <IconButton
                onClick={handleAddTimezone}
                sx={{ mb: 1 }}
                disabled={!selectedTimezone}
              >
                <AddIcon />
              </IconButton>
              <IconButton onClick={handleReverseOrder}>
                <SwapVertIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 2 }}>
          {timezones.map((timezone) => (
            <TimezoneItem
              key={timezone.id}
              id={timezone.id}
              sliderValue={timezone.sliderValue}
              onDelete={handleDeleteTimezone}
              onSliderChange={(newValue) =>
                handleSliderChange(timezone.id, newValue)
              }
              timezone={timezone.tz}
              darkMode={darkMode}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
