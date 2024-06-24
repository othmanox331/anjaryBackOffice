import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";
import "./index.css";

const ImageUploadPreview = ({ multiple = true, images = [], onImageAdd }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => {
        return {
          id: uuidv4(),
          file,
          preview: URL.createObjectURL(file),
        };
      });

      if (multiple) {
        onImageAdd((prevImages) => [...prevImages, ...newImages]);
      } else {
        onImageAdd(newImages);
      }
    },
    [multiple]
  );

  const removeImage = (id) => {
    onImageAdd((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: multiple,
  });

  return (
    <div className="dropzone_container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag & drop some images here, or click to select images</p>
      </div>
      <div className="previews">
        {images.map((image) => (
          <div key={image.id} className="preview">
            <img src={image.preview} alt="preview" />
            <button onClick={() => removeImage(image.id)}>
              <FaTrash size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadPreview;
