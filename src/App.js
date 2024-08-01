import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import HomePage from "./pages/HomePage";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </ThemeProvider>
  );
}

export default App;
