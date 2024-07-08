import React, { useEffect, useState } from "react";
import ProductTable from "./components/Products";
import { Card, Modal, Select, Alert, Pagination } from "@components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StyledEngineProvider } from "@mui/material/styles";
import { FaPlus } from "react-icons/fa";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { APIs } from "@services";
import Images from "./components/Images";
import EditImages from "./components/EditImages";
import { Bounce, toast } from "react-toastify";

const defaultOption = { label: "", value: 0 };
const Products = () => {
  const [isModalUpdateImageOpen, setUsModalUpdateImageOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [productInputs, setProductInputs] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    isBestSeller: false,
    category: 0,
  });

  const [size, setSize] = useState(5);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [validateMessage, setValidateMessage] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesUpdate, setImagesUpdate] = useState([]);
  const [Editedimages, setEditedimages] = useState([]);
  const [catValue, setCatValue] = useState(null);
  const [UpdateId, setUpdateId] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [size, page, searchValue]);

  const fetchProduct = async () => {
    const response = await APIs.Product.List({
      size: size,
      page: page,
      searchValue: searchValue,
    });
    setProducts(response.content);
    setTotalItems(response.totalItems);
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
      if (isModalUpdate) {
        if (handleUpdateProduct(productInputs)) {
          toast.success("Product modifier avec success", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

          fetchProduct();
          setIsModalOpen(false);
          clearModal();
        } else {
          toast.error(response.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } else {
        if (handleAddProduct({ ...productInputs, images })) {
          toast.success("Product Ajouter avec success", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

          fetchProduct();
          setIsModalOpen(false);
          //setIsEditImageModalOpen(false);
          clearModal();
        } else {
          toast.error(response.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      }
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
    const response = await APIs.Product.Add(product);
    if (response.isSuccess) {
      return true;
    }

    return false;
  };
  const handleUpdateProduct = async (product) => {
    let params = { ...product, CategoryId: product.category, id: UpdateId };

    const response = await APIs.Product.Update(params);
    if (response.isSuccess) {
      return true;
    }

    return false;
  };

  const handelModalOpen = async () => {
    const response = await APIs.Category.SelectList();
    setCategories([...response, defaultOption]);
    setIsModalOpen(true);
    setIsModalUpdate(false);
  };

  const handelCategoryChange = (item) => {
    setProductInputs((prevState) => ({
      ...prevState,
      category: item.value,
    }));
    setCatValue(item);
  };

  const handelUpdate = async (id) => {
    const response = await APIs.Product.GetById(id);
    if (response != null || response != undefined) {
      const CategoriesResponse = await APIs.Category.SelectList();
      setProductInputs({
        name: response.name,
        description: response.description,
        price: response.price,
        stockQuantity: response.stockQuantity,
        isBestSeller: response.isBestSeller,
        category: response.categoryId,
      });
      setCategories(CategoriesResponse);
      const getCategoryObj = categories.find(
        (ele) => ele.value === response.categoryId
      );
      setUpdateId(response.id);
      setCatValue(getCategoryObj);
      setIsModalOpen(true);
      setIsModalUpdate(true);
    }
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
    setCatValue("");
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
    setCatValue(defaultOption);
  };

  const handelEditImage = async (id) => {
    setUpdateId(id);
    fetchImages();
    setUsModalUpdateImageOpen(true);
  };

  const fetchImages = async () => {
    const response = await APIs.Product.GetImagesById(UpdateId);
    setEditedimages(response);
  };
  const handelCloseModalUpdateImage = () => {
    setUsModalUpdateImageOpen(false);
  };
  const handleSubmitUpdateImag = async () => {
    const response = await APIs.Product.UpdateIsPrinciple(Editedimages);
    if (response.isSuccess) {
      toast.success("Product supprimer avec success", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      toast.error(response.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    handelCloseModalUpdateImage();
  };

  const handelAddImage = async (image) => {
    const response = await APIs.Product.AddImage(image, UpdateId);
    if (response.isSuccess) {
      toast.success("Image ajouter avec success", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      fetchImages();
    } else {
      toast.error(response.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  const handelDeleteImage = async (name) => {
    const response = await APIs.Product.DeleteImage(name);
    if (response.isSuccess) {
      toast.success("Image supprimer avec success", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      fetchImages();
    } else {
      toast.error(response.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handelDelete = (id) => {
    setIsModalDelete(true);
    setUpdateId(id);
  };

  const handleSubmitDelete = async () => {
    const response = await APIs.Product.Delete(UpdateId);
    if (response.isSuccess) {
      toast.success("Product supprimer avec success", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      fetchProduct();
    } else {
      toast.error(response.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    setIsModalDelete(false);
  };

  return (
    <div className="product__container">
      <Card>
        <Row>
          <Col>
            <h2>Product list</h2>
          </Col>
          <Col md="auto d-flex align-items-center gap-3">
            <TextField
              autoFocus
              margin="dense"
              name="searchValue"
              label="Recherche"
              type="text"
              fullWidth
              value={searchValue}
              onChange={(value) => setSearchValue(value.target.value)}
            />
            <button onClick={handelModalOpen} className="btn btn-success">
              <FaPlus />
            </button>
          </Col>
        </Row>
        <Row>
          <Col>
            <StyledEngineProvider>
              <ProductTable
                products={products}
                handelUpdate={handelUpdate}
                handelEditImage={handelEditImage}
                handelDelete={handelDelete}
              />
            </StyledEngineProvider>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col></Col>
          <Col md="auto">
            <Pagination
              page={page}
              count={Math.ceil(totalItems / size)}
              handleChange={(event, value) => setPage(value)}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        title={
          isModalUpdate ? "Modifier un produit Product" : "Ajouter un Product"
        }
        show={isModalOpen}
        onHide={handelCloseModal}
        onSave={handleSubmit}
        size={isModalUpdate ? "lg" : "xl"}
      >
        <Row>
          {!isModalUpdate && (
            <Col md={6}>
              <Images images={images} setImages={setImages} />
            </Col>
          )}

          <Col md={isModalUpdate ? 12 : 6}>
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
              value={catValue}
            />
          </Col>
        </Row>
      </Modal>

      <Modal
        title={"Modifier images Product"}
        show={isModalUpdateImageOpen}
        onHide={handelCloseModalUpdateImage}
        onSave={handleSubmitUpdateImag}
        size={"lg"}
      >
        <Row>
          <Col md={12}>
            <EditImages
              _images={Editedimages}
              set_images={setEditedimages}
              handelDeleteImage={handelDeleteImage}
              handelAddImage={handelAddImage}
            />
          </Col>
        </Row>
      </Modal>

      <Modal
        title={"Supprimer un Product"}
        show={isModalDelete}
        onHide={() => setIsModalDelete(false)}
        onSave={handleSubmitDelete}
        size={"lg"}
      >
        <Row>
          <Col md={12}>Voulez vous vraiment supprimer le produit ??</Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Products;
