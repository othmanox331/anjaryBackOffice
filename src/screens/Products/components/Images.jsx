import React, { useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import unknown from "../../../common/unknown.png";
import "./Images.css";

const images_test = [
  // {
  //   imageName: unknown,
  //   isPrinciple: true,
  // },
];

const DefaultData = [
  {
    imageName: unknown,
    isPrinciple: false,
  },
  {
    imageName: unknown,
    isPrinciple: false,
  },
];

const Images = ({ images = [], setImages }) => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    setData(images);
  }, []);

  const setData = (images) => {
    setImages(images);
  };

  const handleClick = (imageName) => {
    const updatedImages = images.map((image) => ({
      ...image,
      isPrinciple: image.imageName === imageName,
    }));
    setData(updatedImages);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          imageName: reader.result,
          Image: file,
          isPrinciple: true,
        };
        const updatedImages = images.map((image) => ({
          imagePath: image.imageName,
          Image: image.Image,
          isPrinciple: false,
        }));

        setData([newImage, ...updatedImages]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (imageName) => {
    const updatedImages = images.filter((img) => img.imageName !== imageName);
    setData(updatedImages);
  };

  const handlePrincipleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Row>
      <Col md="4 image_side_holder">
        <button onClick={handlePrincipleClick} className="mt-3">
          Upload New Image
        </button>

        {images
          .filter((img) => !img.isPrinciple)
          .map((item, index) => (
            <div key={index} className="side_image mb-3 position-relative">
              <img
                src={item.imageName}
                alt={`Image ${index}`}
                onClick={() => handleClick(item.imageName)}
              />
              {item.imageName !== unknown && (
                <>
                  <input
                    type="radio"
                    name="principleImage"
                    checked={item.isPrinciple}
                    onChange={() => handleClick(item.imageName)}
                    className="position-absolute top-0 start-0 m-2"
                  />
                  <button
                    onClick={() => handleDelete(item.imageName)}
                    className="position-absolute top-0 end-0 m-2"
                  >
                    Delete
                  </button>
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
                src={images.find((img) => img.isPrinciple).imageName}
                alt="Principle Image"
              />
              {images.find((img) => img.isPrinciple).imageName != unknown && (
                <button
                  onClick={() =>
                    handleDelete(
                      images.find((img) => img.isPrinciple).imageName
                    )
                  }
                  className="position-absolute top-0 end-0 m-2"
                >
                  Delete
                </button>
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
