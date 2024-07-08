import React, { useEffect, useRef, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { URL } from "@common";
import { APIs } from "@services";
import { Button, Popover, Typography } from "@mui/material";
import { Col, Row } from "react-bootstrap";

const EditImages = ({
  _images,
  set_images,
  handelDeleteImage,
  handelAddImage,
}) => {
  const [images, setImages] = useState(_images);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [NewImage, setNewImage] = React.useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImages(_images);
  }, [_images]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const updatePrincipale = (name) => {
    set_images((prevImages) =>
      prevImages.map((image) =>
        image.imagePath === name
          ? { ...image, isPrinciple: true }
          : { ...image, isPrinciple: false }
      )
    );
  };

  const handelImageChnage = (event) => {
    setNewImage(event.target.files[0]);
  };

  const handelNewImage = (image) => {
    handelAddImage(image);
    fileInputRef.current.value = "";
  };

  return (
    <Row>
      <Col md={12}>
        <Row>
          <Col>
            <input
              type="file"
              onChange={handelImageChnage}
              ref={fileInputRef}
            />
          </Col>
          <Col md="auto">
            <button
              onClick={() => handelNewImage(NewImage)}
              className="btn btn-success"
            >
              <FaPlus />
            </button>
          </Col>
        </Row>
      </Col>
      <Col md={12}>
        <table width={"100%"}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Principale</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {images &&
              images.map((image) => {
                return (
                  <tr>
                    <td>
                      <img
                        src={`${URL}images/${image.imagePath}`}
                        width={200}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        checked={image.isPrinciple}
                        onClick={() => updatePrincipale(image.imagePath)}
                      />
                    </td>
                    <td>
                      <Button
                        aria-describedby={id}
                        variant="contained"
                        onClick={handleClick}
                        width={50}
                      >
                        Supprimer
                      </Button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <Typography sx={{ p: 2 }}>
                          Vous etes sur vous vouler supprimer cet image ?
                          <br />
                          <button
                            className="btn btn-danger"
                            onClick={() => handelDeleteImage(image.imagePath)}
                          >
                            <FaTrash />
                          </button>
                        </Typography>
                      </Popover>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Col>
    </Row>
  );
};

export default EditImages;
