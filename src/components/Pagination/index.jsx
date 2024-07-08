import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationCom({ page, handleChange, count }) {
  return (
    <Stack
      spacing={2}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
}
