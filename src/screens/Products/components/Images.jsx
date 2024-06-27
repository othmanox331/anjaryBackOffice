import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import unknown from "../../../common/unknown.png";
import "./Images.css";

const images_test = [
  {
    imageName: unknown,
    isPrinciple: true,
  },
  // Other images if needed
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

const Images = () => {
  const [images, setImages] = useState([]);
  const [principleImage, setPrincipleImage] = useState(null);

  useEffect(() => {
    if (images_test.length > 0 && images_test.length <= 1) {
      DefaultData.forEach((t) => {
        images_test.push(t);
      });
    }

    setData(images_test);
  }, []);

  const setData = (images) => {
    setImages(images.filter((t) => !t.isPrinciple));
    setPrincipleImage(images.find((t) => t.isPrinciple));
  };

  const handleClick = (imageName) => {
    const updatedImages = images_test.map((image) => ({
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
          isPrinciple: true,
        };

        const oldPrincipleImage = principleImage
          ? { ...principleImage, isPrinciple: false }
          : null;

        let updatedImages = [newImage, ...images];

        if (oldPrincipleImage) {
          updatedImages = [
            newImage,
            oldPrincipleImage,
            ...images.filter((img) => img.imageName !== newImage.imageName),
          ];
        }

        setData(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Row>
      <Col md="4 image_side_holder">
        {images.map((item, index) => (
          <div key={index} className="side_image mb-3">
            <img
              src={item.imageName}
              alt={`Image ${index}`}
              onClick={() => handleClick(item.imageName)}
            />
          </div>
        ))}
      </Col>
      <Col md="8">
        {principleImage != null && (
          <div className="side_image principle">
            <img src={principleImage.imageName} alt="Principle Image" />
            <input type="file" onChange={handleFileChange} />
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Images;
