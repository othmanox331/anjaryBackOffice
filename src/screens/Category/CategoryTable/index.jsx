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
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

const CategoryTable = ({ categories, handelUpdate, handelDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Is Home</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell component="th" scope="row">
                {category.name}
              </TableCell>
              <TableCell align="center">
                {category.isHome ? "Yes" : "No"}
              </TableCell>
              <TableCell align="center">{category.title}</TableCell>
              <TableCell align="center">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => handelUpdate(category.id)}
                >
                  <FaPen />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handelDelete(category.id)}
                >
                  <FaTrash />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
