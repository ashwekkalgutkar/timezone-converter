import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import {
  Brightness7 as Brightness7Icon,
  Brightness4 as Brightness4Icon,
} from "@mui/icons-material";

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Timezone Converter
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton edge="end" color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
