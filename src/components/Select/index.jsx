import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function index({ data, Lable, onvaluechange, Multiple }) {
  return (
    <Autocomplete
      multiple={Multiple}
      disablePortal
      id="combo-box-demo"
      options={data}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label={Lable} />}
      onChange={onvaluechange}
    />
  );
}
