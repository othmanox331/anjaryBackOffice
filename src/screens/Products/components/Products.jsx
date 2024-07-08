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
import { FaTrash, FaPen } from "react-icons/fa";
import { IoMdImage } from "react-icons/io";

const ProductTable = ({
  products,
  handelUpdate,
  handelDelete,
  handelEditImage,
}) => {
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
              <TableCell align="center">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => handelUpdate(product.id)}
                >
                  <FaPen />
                </button>
                <button
                  className="btn btn-light me-2"
                  onClick={() => handelEditImage(product.id)}
                >
                  <IoMdImage />
                </button>
                <button
                  className="btn btn-danger "
                  onClick={() => handelDelete(product.id)}
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

export default ProductTable;
