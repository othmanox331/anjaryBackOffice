import React, { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import { Card, Modal, DragAndDrop } from "@components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StyledEngineProvider } from "@mui/material/styles";
import { FaPlus } from "react-icons/fa";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { APIs } from "@services";
import { Bounce, toast } from "react-toastify";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [UpdateId, setUpdateId] = useState(0);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [categoryInputs, setCategoryInputs] = useState({
    name: "",
    isHome: false,
    title: "",
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, [size, page, searchValue]);

  const fetchCategories = async () => {
    let response = await APIs.Category.List(size, page, searchValue);
    setCategories(response);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategoryInputs({
      ...categoryInputs,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handelUpdate = async (id) => {
    try {
      const response = await APIs.Category.GetById(id);
      setUpdateId(response.id);
      setCategoryInputs({
        name: response.Name,
        isHome: response.IsHome,
        title: response.Title,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handelDelete = (id) => {};

  const handleSubmit = async () => {
    let data = {
      Name: categoryInputs.name,
      IsHome: categoryInputs.isHome,
      Title: categoryInputs.title,
      Image: images[0],
    };
    const response = await APIs.Category.Add(data);
    if (response.isSuccess) {
      toast.success("Order Added successfully", {
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

      fetchCategories();
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
  };

  const onImageAdd = (newImages) => {
    setImages(newImages);
  };

  const clearModal = () => {
    setCategoryInputs({
      name: "",
      isHome: false,
      title: "",
    });
  };
  const handeSearchValueChange = (value) => {
    setSearchValue(value.target.value);
  };

  return (
    <div className="category__container">
      <Card>
        <Row>
          <Col>
            <h2>Category List</h2>
          </Col>
          <Col md="auto">
            <Row className="align-items-center">
              <Col>
                <TextField
                  autoFocus
                  margin="dense"
                  name="searchValue"
                  label="Recherche"
                  type="text"
                  fullWidth
                  value={searchValue}
                  onChange={handeSearchValueChange}
                />
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
          </Col>
        </Row>
        <Row>
          <Col>
            <StyledEngineProvider>
              <CategoryTable
                categories={categories}
                handelUpdate={handelUpdate}
                handelDelete={handelDelete}
              />
            </StyledEngineProvider>
          </Col>
        </Row>
      </Card>
      <Modal
        title={isUpdateModal ? "Modifer une Category" : "ajouter une Category"}
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
          value={categoryInputs.name}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={categoryInputs.isHome}
              onChange={handleChange}
              name="isHome"
              color="primary"
            />
          }
          label="Is Home"
        />
        {categoryInputs.isHome && (
          <Row>
            <Col md="12" className="mb-3">
              <TextField
                margin="dense"
                name="title"
                label="Title"
                type="text"
                fullWidth
                value={categoryInputs.title}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <DragAndDrop
                multiple={false}
                images={images}
                onImageAdd={(value) => onImageAdd(value)}
              />
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
};

export default Categories;
