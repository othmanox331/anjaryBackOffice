import React, { useState } from "react";
import ProductTable from "./components/Products";
import { Card, Modal } from "@components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StyledEngineProvider } from "@mui/material/styles";
import { FaPlus } from "react-icons/fa";
import { TextField, FormControlLabel,Checkbox } from "@mui/material";


const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productInputs, setProductInputs] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    isBestSeller: false,
    createDate: "",
    category: ""
});
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is product 1",
      price: 100,
      stockQuantity: 50,
      isBestSeller: true,
      createDate: "2023-01-01",
      category: "Category 1",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is product 2",
      price: 200,
      stockQuantity: 30,
      isBestSeller: false,
      createDate: "2023-02-15",
      category: "Category 2",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is product 3",
      price: 300,
      stockQuantity: 20,
      isBestSeller: false,
      createDate: "2023-03-10",
      category: "Category 3",
    },
  ];


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductInputs({ ...productInputs, [name]: type === 'checkbox' ? checked : value });
};

const handleSubmit = () => {
    handleAddProduct(productInputs);
    setIsModalOpen(false);
};


  return (
    <div className="product__container">
      <Card>
        <Row>
          <Col>
            <h2>Product list</h2>
          </Col>
          <Col md="auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-success"
            >
              <FaPlus />
            </button>
          </Col>
        </Row>
        <Row>
          <Col>
            <StyledEngineProvider>
              <ProductTable products={products} />
            </StyledEngineProvider>
          </Col>
        </Row>
      </Card>
      <Modal
        title="Add Product"
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        onSave={handleSubmit}
      >
        <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={productInputs.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    value={productInputs.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    value={productInputs.price}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="stockQuantity"
                    label="Stock Quantity"
                    type="number"
                    fullWidth
                    value={productInputs.stockQuantity}
                    onChange={handleChange}
                />
                 <FormControlLabel
                    control={
                        <Checkbox
                            checked={productInputs.isBestSeller}
                            onChange={handleChange}
                            name="isBestSeller"
                            color="primary"
                        />
                    }
                    label="Best Seller"
                />
                <TextField
                    margin="dense"
                    name="createDate"
                    label="Create Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={productInputs.createDate}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="category"
                    label="Category"
                    type="text"
                    fullWidth
                    value={productInputs.category}
                    onChange={handleChange}
                />
      </Modal>
    </div>
  );
};

export default Products;
