import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { URL } from "@common";

const SliderTable = ({ sliders }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!sliders &&
            sliders.map((slider, index) => (
              <TableRow key={slider.name}>
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell>
                  <img
                    src={`${URL}images/${slider.name}`}
                    style={{ width: "100px" }}
                  />
                </TableCell>
                <TableCell>{slider.order}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SliderTable;
