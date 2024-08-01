import React, { useState } from "react";
import { Grid, TextField, IconButton, Box } from "@mui/material";
import { Add as AddIcon, SwapVert as SwapVertIcon } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import TimezoneItem from "../components/TimezoneItem";
import Header from "../components/Header";
import { timezoneOptions } from "../utils/timezoneOptions";
import moment from "moment-timezone";

const HomePage = () => {
  const [timezones, setTimezones] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState(null);

  const handleAddTimezone = () => {
    if (selectedTimezone) {
      const now = moment().tz(selectedTimezone.tz);
      const sliderValue = now.hours() * 60 + now.minutes();

      setTimezones((prevTimezones) => [
        ...prevTimezones,
        {
          ...selectedTimezone,
          id: selectedTimezone.tz + Date.now(), // Ensure uniqueness
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
      const referenceTime = moment()
        .tz(referenceTimezone.tz)
        .startOf("day")
        .add(newValue, "minutes");

      const updatedTimezones = timezones.map((tz) => {
        if (tz.id === id) {
          return { ...tz, sliderValue: newValue };
        }

        const referenceOffset = moment.tz(referenceTimezone.tz).utcOffset();
        const targetOffset = moment.tz(tz.tz).utcOffset();

        const offsetDifference = referenceOffset - targetOffset;
        const targetSliderValue = newValue - offsetDifference;

        return {
          ...tz,
          sliderValue: targetSliderValue,
        };
      });

      setTimezones(updatedTimezones);
    } catch (error) {
      console.error("Error in handleSliderChange:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
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
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <IconButton
                onClick={handleAddTimezone}
                sx={{ mb: 1 }}
                color="primary"
              >
                <AddIcon />
              </IconButton>
              <IconButton onClick={handleReverseOrder} color="primary">
                <SwapVertIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {timezones.map((timezone) => (
            <TimezoneItem
              key={timezone.id}
              id={timezone.id}
              timezone={timezone.tz}
              sliderValue={timezone.sliderValue}
              onDelete={handleDeleteTimezone}
              onSliderChange={handleSliderChange}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
