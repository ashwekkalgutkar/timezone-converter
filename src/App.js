import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Button } from "@mui/material";
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
      {/* <Button onClick={toggleDarkMode} style={{ margin: "16px" }}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </Button> */}
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
