import React, { useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import unknown from "../../../common/unknown.png";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { URL } from "@common";
import "./Images.css";

const Images = ({ images = [], setImages }) => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    setData(images);
  }, []);

  const setData = (images) => {
    setImages(images);
  };

  const handleClick = (imagePath) => {
    const updatedImages = images.map((image) => ({
      ...image,
      isPrinciple: image.imagePath === imagePath,
    }));
    setData(updatedImages);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          imagePath: reader.result,
          Image: file,
          isPrinciple: true,
        };
        const updatedImages = images.map((image) => ({
          imagePath: image.imagePath,
          Image: image.Image,
          isPrinciple: false,
        }));

        setData([newImage, ...updatedImages]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (imagePath) => {
    const updatedImages = images.filter((img) => img.imagePath !== imagePath);
    setData(updatedImages);
  };

  const handlePrincipleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Row>
      <Col md="4 image_side_holder">
        <button onClick={handlePrincipleClick} className="mt-3 add_image">
          <FaPlus size={34} />
        </button>

        {images
          .filter((img) => !img.isPrinciple)
          .map((item, index) => (
            <div key={index} className="side_image mb-3 position-relative">
              <img
                src={
                  item.imagePath.startsWith("data:image")
                    ? item.imagePath
                    : `${URL}images/${item.imagePath}`
                }
                alt={`Image ${index}`}
                // onClick={() => handleClick(item.imagePath)}
              />
              {item.imagePath !== unknown && (
                <>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-principle">
                        Rendre Cette image principale
                      </Tooltip>
                    }
                  >
                    <input
                      type="radio"
                      name="principleImage"
                      checked={item.isPrinciple}
                      onChange={() => handleClick(item.imagePath)}
                      className="position-absolute top-0 start-0 m-2"
                    />
                  </OverlayTrigger>

                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-principle">
                        Supprimer l'image
                      </Tooltip>
                    }
                  >
                    <button
                      onClick={() => handleDelete(item.imagePath)}
                      className="position-absolute top-0 end-0 m-2 delete_botton"
                    >
                      <FaTrash size={20} />
                    </button>
                  </OverlayTrigger>
                </>
              )}
            </div>
          ))}
      </Col>
      <Col md="8">
        {images.find((img) => img.isPrinciple) != null && (
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-principle">
                Ceci est l'image principale
              </Tooltip>
            }
          >
            <div className="side_image principle position-relative">
              <img
                src={
                  images
                    .find((img) => img.isPrinciple)
                    .imagePath.startsWith("data:image")
                    ? images.find((img) => img.isPrinciple).imagePath
                    : `${URL}images/${
                        images.find((img) => img.isPrinciple).imagePath
                      }`
                }
                alt="Principle Image"
              />
              {images.find((img) => img.isPrinciple).imagePath != unknown && (
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-principle">Supprimer l'image</Tooltip>
                  }
                >
                  <button
                    onClick={() =>
                      handleDelete(
                        images.find((img) => img.isPrinciple).imageName
                      )
                    }
                    className="position-absolute top-0 end-0 m-2 delete_botton"
                  >
                    <FaTrash size={24} />
                  </button>
                </OverlayTrigger>
              )}
            </div>
          </OverlayTrigger>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          hidden
          ref={fileInputRef}
        />
      </Col>
    </Row>
  );
};

export default Images;
