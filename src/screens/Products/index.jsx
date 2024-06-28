import React, { useEffect, useState } from "react";
import ProductTable from "./components/Products";
import { Card, Modal, Select, Alert } from "@components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StyledEngineProvider } from "@mui/material/styles";
import { FaPlus } from "react-icons/fa";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { APIs } from "@services";
import Images from "./components/Images";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productInputs, setProductInputs] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    isBestSeller: false,
    category: 0,
  });
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [validateMessage, setValidateMessage] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, [size, page, searchValue]);

  const fetchProduct = async () => {
    const response = await APIs.Product.List({
      size: size,
      page: page,
      searchValue: searchValue,
    });
    setProducts(response);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductInputs({
      ...productInputs,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    if (validate()) {
      handleAddProduct({ ...productInputs, images });
      // setIsModalOpen(false);
    }
  };

  const handleAddProduct = async (product) => {
    let newImages = [];
    product.images.map((img) => {
      newImages.push({
        Image: img.Image,
        isPrinciple: img.isPrinciple,
      });
    });
    product.images = newImages;
    await APIs.Product.Add(product);
  };

  const handelModalOpen = async () => {
    const response = await APIs.Category.SelectList();
    setCategories(response);
    setIsModalOpen(true);
  };

  const handelCategoryChange = (event, item) => {
    setProductInputs((prevState) => ({
      ...prevState,
      category: item.value,
    }));
  };

  const validate = () => {
    const messages = [];

    if (productInputs.name === "") {
      messages.push("Le nom du produit est vide.");
    }
    if (productInputs.description === "") {
      messages.push("La description du produit est vide.");
    }
    if (productInputs.price === "") {
      messages.push("Le prix du produit est vide.");
    }
    if (productInputs.price < 0) {
      messages.push("Le prix du produit non valide.");
    }
    if (productInputs.stockQuantity === "") {
      messages.push("La quantité en stock est vide.");
    }
    if (productInputs.stockQuantity < 0) {
      messages.push("La quantité en stock non valide.");
    }
    if (productInputs.category === 0) {
      messages.push("La catégorie du produit est vide.");
    }

    setValidateMessage(messages);
    return messages.length == 0;
  };

  const handelCloseModal = () => {
    setIsModalOpen(false);
    setValidateMessage([]);

    clearModal();
  };
  const clearModal = () => {
    setProductInputs({
      name: "",
      description: "",
      price: "",
      stockQuantity: "",
      isBestSeller: false,
      category: 0,
    });
    setImages([]);
  };

  return (
    <div className="product__container">
      <Card>
        <Row>
          <Col>
            <h2>Product list</h2>
          </Col>
          <Col md="auto">
            <button onClick={handelModalOpen} className="btn btn-success">
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
        onHide={handelCloseModal}
        onSave={handleSubmit}
        size={"xl"}
      >
        <Row>
          <Col md={6}>
            <Images images={images} setImages={setImages} />
          </Col>
          <Col md={6}>
            {validateMessage.length > 0 && (
              <Alert
                messages={validateMessage}
                type={validateMessage.length != 0 ? "danger" : "primary"}
                variant={"soft"}
              />
            )}
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
            <Row>
              <Col md={6}>
                <TextField
                  margin="dense"
                  name="price"
                  label="Price"
                  type="number"
                  fullWidth
                  value={productInputs.price}
                  onChange={handleChange}
                  min={0}
                />
              </Col>
              <Col md={6}>
                <TextField
                  margin="dense"
                  name="stockQuantity"
                  label="Stock Quantity"
                  type="number"
                  min={0}
                  fullWidth
                  value={productInputs.stockQuantity}
                  onChange={handleChange}
                />
              </Col>
            </Row>

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
            <Select
              data={categories}
              Lable="Category"
              onvaluechange={handelCategoryChange}
              Multiple={false}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Products;
