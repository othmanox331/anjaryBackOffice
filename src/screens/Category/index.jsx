import React, { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import { Card, Modal, DragAndDrop, Alert, Pagination } from "@components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StyledEngineProvider } from "@mui/material/styles";
import { FaPlus, FaPen } from "react-icons/fa";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { APIs } from "@services";
import { Bounce, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { URL } from "@common";
import "./index.css";

const Categories = () => {
  const [isEditImage, setIsEditImage] = useState(false);
  const [isvalidModal, setIsvalidModal] = useState(false);
  const [categoryImageName, setcategoryImageName] = useState("");
  const [validateMessage, setValidateMessage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditImageModalOpen, setIsEditImageModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [UpdateId, setUpdateId] = useState(0);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
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
    setCategories(response.content);
    setTotalItems(response.totalItems);
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
      const response = await getElementById(id);
      console.log(response);
      setUpdateId(response.id);
      setCategoryInputs({
        name: response.name,
        isHome: response.isHome,
        title: response.title,
      });

      setIsModalOpen(true);
      setIsUpdateModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getElementById = async (id) => {
    return await APIs.Category.GetById(id);
  };

  const handelDelete = (id) => {
    setUpdateId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSubmitDelete = async () => {
    const response = await APIs.Category.Delete(UpdateId);
    if (response.isSuccess) {
      toast.success("Category Supprimer successfully", {
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
      setIsDeleteModalOpen(false);
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

  const handleSubmit = async () => {
    await validate();
    let data = {
      id: UpdateId,
      Name: categoryInputs.name,
      IsHome: categoryInputs.isHome,
      Title: categoryInputs.title,
      Image: images.length > 0 ? images[0].file : null,
    };
    if (isvalidModal) {
      if (isUpdateModal) {
        const response = await APIs.Category.Update(data);
        if (response.isSuccess) {
          toast.success("Category mise à jour successfully", {
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
      } else {
        const response = await APIs.Category.Add(data);
        if (response.isSuccess) {
          toast.success("Category Added successfully", {
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
      }
    }
  };

  const onImageAdd = (newImages) => {
    setImages(newImages);
    //setIsDeleteModalOpen(true);
  };

  const clearModal = () => {
    setCategoryInputs({
      name: "",
      isHome: false,
      title: "",
    });
    setImages([]);
  };
  const handeSearchValueChange = (value) => {
    setSearchValue(value.target.value);
  };

  const handelEditImage = async (id) => {
    const response = await getElementById(id);
    setcategoryImageName(response.imagePath);
    setUpdateId(id);
    setIsEditImageModalOpen(true);
  };

  const validate = () => {
    let errors = [];
    try {
      if (categoryInputs.name == "") {
        errors.push("le nom de category ne peux pas étre null ");
      }
      if (categoryInputs.isHome) {
        if (categoryInputs.title == "") {
          errors.push(
            "le titre de category ne peux pas étre null pour les category de home"
          );
        }
        if (images.length == 0 && !isUpdateModal) {
          errors.push(
            "l'image de category ne peux pas étre null pour les category de home"
          );
        }
      }
    } catch (error) {
    } finally {
      if (errors.length > 0) {
        setIsvalidModal(false);
      } else {
        setIsvalidModal(true);
      }
      setValidateMessage(errors);
    }
  };

  const handelOpenModal = () => {
    clearModal();
    setIsModalOpen(true);
    setIsUpdateModal(false);
  };

  const handleSubmitEditImage = async () => {
    const response = await APIs.Category.UpdateImage(UpdateId, images[0]);
    if (response.isSuccess) {
      toast.success("Image Category Modifier par succes", {
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
      setIsEditImage(false);
      setIsEditImageModalOpen(false);
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
                  onClick={() => handelOpenModal()}
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
                handelEditImage={handelEditImage}
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
        title={isUpdateModal ? "Modifer une Category" : "ajouter une Category"}
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        onSave={handleSubmit}
      >
        {!isvalidModal && validateMessage.length > 0 && (
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
                required={categoryInputs.isHome}
              />
            </Col>
            {!isUpdateModal && (
              <Col>
                <DragAndDrop
                  multiple={false}
                  images={images}
                  onImageAdd={(value) => onImageAdd(value)}
                />
              </Col>
            )}
          </Row>
        )}
      </Modal>

      <Modal
        title={"Supprimer"}
        show={isDeleteModalOpen}
        onHide={() => setIsDeleteModalOpen(false)}
        onSave={handleSubmitDelete}
      >
        Voulez-vous vraiment Supprimer la category
      </Modal>

      <Modal
        title={"Modifier Image d'un category"}
        show={isEditImageModalOpen}
        onHide={() => {
          setIsEditImageModalOpen(false);
          setIsEditImage(false);
        }}
        onSave={handleSubmitEditImage}
      >
        <Row>
          {!isEditImage ? (
            <Col md={12}>
              <div className="image_edit" style={{ position: "relative" }}>
                <button
                  className="edit_image_button"
                  onClick={() => setIsEditImage(true)}
                >
                  <FaPen size={20} />
                </button>
                <img
                  src={`${URL}images/${categoryImageName}`}
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </Col>
          ) : (
            <Col md={12}>
              <DragAndDrop
                multiple={false}
                images={images}
                onImageAdd={(value) => onImageAdd(value)}
              />
            </Col>
          )}
        </Row>
      </Modal>
    </div>
  );
};

export default Categories;
