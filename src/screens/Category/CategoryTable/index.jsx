import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const CategoryTable = ({ categories }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Is Home</TableCell>
                        <TableCell align="right">Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell component="th" scope="row">
                                {category.name}
                            </TableCell>
                            <TableCell align="right">{category.isHome ? "Yes" : "No"}</TableCell>
                            <TableCell align="right">{category.title}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CategoryTable;
