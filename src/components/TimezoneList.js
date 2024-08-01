import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const TimezoneList = ({ timezones, onDeleteTimezone }) => {
  return (
    <List>
      {timezones.map((timezone) => (
        <ListItem key={timezone.id}>
          <ListItemText
            primary={timezone.tz}
            secondary={
              timezone.date
                ? new Date(timezone.date).toLocaleDateString()
                : "No Date"
            }
          />
          <IconButton onClick={() => onDeleteTimezone(timezone.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TimezoneList;
