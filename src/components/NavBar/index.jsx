import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserDropDown from "../UserDropDown";
import "./index.css";

const index = ({ page }) => {
  return (
    <div className="Nav_Bar">
      <Row>
        <Col>
          <h3>{page}</h3>
        </Col>
        <Col md="auto">
          <UserDropDown />
        </Col>
      </Row>
    </div>
  );
};

export default index;
