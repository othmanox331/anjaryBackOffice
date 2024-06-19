import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";

const Button = ({ isLoading, label, pressed, StartIcon, EndIcon }) => {
  return (
    <Stack direction="row" spacing={2}>
      <LoadingButton
        style={{ color: "black", textTransform: "capitalize", background: "#f2f2f2" }}
        onClick={pressed}
        loading={isLoading}
        loadingPosition="end"
        startIcon={!!StartIcon ? <StartIcon style={{transform: label === 'Précédent' && "rotate(180deg)", color: "#574d4d"}} /> : isLoading && <div style={{width: 15}}></div>}
        endIcon={!!EndIcon ? <EndIcon style = {{color: "#574d4d"}} /> : isLoading && <div style={{width: 15}}></div>}
        variant="outlined"
      >
        {label}
      </LoadingButton>
    </Stack>
  );
};

export default Button;
