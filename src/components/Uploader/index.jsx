import React from "react";
import "./index.css";
import { BsPlusSquareDotted } from "react-icons/bs";

export default ({
  acceptedFiles,
  getRootProps,
  getInputProps,
  error,
  isUpdate,
  picture,
  label
}) => {
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container_drop">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <strong
          style={{
            color: "#5f5be6",
            fontSize: 12,
            marginTop: 16,
          }}
        >
          {!!label ? label : "Image"}
        </strong>
        <p style={{ color: !!error?.message && "red" }}>
          {!!error?.message
            ? error?.message
            : "Faites glisser et déposez des fichiers ici, ou cliquez pour sélectionner des fichiers"}
        </p>
        <BsPlusSquareDotted style={{ fontSize: 33 }} />
      </div>
      <aside>
        <h4>Fichier</h4>
        <ul>{files}</ul>
        {isUpdate && !!picture && (
          <img src={picture} style={{ width: "60px", height: "60px" }} />
        )}
      </aside>
    </section>
  );
};