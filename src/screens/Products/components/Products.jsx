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

const ProductTable = ({ products }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Prix</TableCell>
            <TableCell align="center">Quantité</TableCell>
            <TableCell align="center">Best Seller</TableCell>
            <TableCell align="center">Create Date</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="center">{product.description}</TableCell>
              <TableCell align="center">{product.price}</TableCell>
              <TableCell align="center">{product.stockQuantity}</TableCell>
              <TableCell align="center">
                {product.isBestSeller ? "Yes" : "No"}
              </TableCell>
              <TableCell align="center">
                {new Date(product.createDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">{product.category}</TableCell>
              <TableCell align="center">{product.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
