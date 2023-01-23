import { Fab } from "@mui/material";
import React from "react";

function InfoButton(props) {
  return (
    <Fab
      hidden={props.hidden}
      variant="extended"
      size="small"
      disabled={props.disabled}
      color={props.color}
      sx={{ ml: "0.5rem", mb: "0.7rem" }}
    >
      {props.icon}
      {props.disabled ? "" : props.text}
    </Fab>
  );
}

export default InfoButton;
