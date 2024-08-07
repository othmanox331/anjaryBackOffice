import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function index({ data, Lable, onvaluechange, Multiple, value }) {
  console.log(JSON.stringify(data), value);

  // Ensure value is always defined
  const controlledValue = value !== undefined ? value : Multiple ? [] : null;
  return (
    <Autocomplete
      multiple={Multiple}
      disablePortal
      id="combo-box-demo"
      options={data}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label={Lable} />}
      onChange={(event, newValue) => onvaluechange(newValue)}
      value={controlledValue}
    />
  );
}
