import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Text(props) {
  const { label, helper, rows, multiline, setTextType } = props;
  const handleChange = (event) => {
    setTextType(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          // error
          // id="standard-error-helper-text"
          label={label} 
          variant="outlined"
          helperText={helper}
          rows={rows}
          multiline={multiline}
          onChange={handleChange}
        />
      </div>
    </Box>
  );
}
