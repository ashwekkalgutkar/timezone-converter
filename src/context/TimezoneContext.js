import React, { createContext, useState } from "react";
import moment from "moment-timezone";

export const TimezoneContext = createContext();

export const TimezoneProvider = ({ children }) => {
  const [timezones, setTimezones] = useState(["UTC", "IST"]);
  const [currentTime, setCurrentTime] = useState(moment());
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addTimezone = (timezone) => {
    setTimezones((prev) => [...prev, timezone]);
  };

  const removeTimezone = (timezone) => {
    setTimezones((prev) => prev.filter((tz) => tz !== timezone));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <TimezoneContext.Provider
      value={{
        timezones,
        currentTime,
        setCurrentTime,
        addTimezone,
        removeTimezone,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </TimezoneContext.Provider>
  );
};
