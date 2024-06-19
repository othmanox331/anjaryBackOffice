import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function FormFloatingBasicExample({
  Label,
  type,
  value,
  onChangeText,
  placeholder,
}) {
  return (
    <>
      <FloatingLabel controlId="floatingInput" label={Label} className="mb-3">
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
        />
      </FloatingLabel>
    </>
  );
}

export default FormFloatingBasicExample;
