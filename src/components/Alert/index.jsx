import * as React from "react";
import Alert from "@mui/joy/Alert";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";

import Typography from "@mui/joy/Typography";

export default function AlertColors({ messages, type, variant }) {
  const [_var, setVar] = React.useState(variant);
  let cmpt = 0;
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Alert variant={_var} color={type}>
          <ul className="mb-0">
            {messages &&
              messages.map((item) => {
                return (
                  <li className="mb-0" key={++cmpt}>
                    {item}
                  </li>
                );
              })}
          </ul>
        </Alert>
      </Stack>
    </Box>
  );
}
