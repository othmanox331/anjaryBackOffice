import React from "react";
import { Card, Colors } from "@components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaBox } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

import "./index.css";

const Home = () => {
  const GetInnerData = (type, iconColor) => {
    let boxData = {
      icon: <FaBox />,
      number: 350,
      title: "Total Products",
      percenteg: "+ 2.5%",
    };

    switch (type) {
      case "Orders":
        boxData = {
          icon: <IoCheckbox size={20} />,
          number: 228,
          title: "Completed Orders",
          percenteg: "+ 2.5%",
        };
        break;
      case "CanceledOrders":
        boxData = {
          icon: <RiCheckboxIndeterminateFill size={20} />,
          number: 125,
          title: "Canceled Orders",
          percenteg: "- 2.5%",
        };
        break;
      case "TopOrders":
        boxData = {
          icon: <FaStar size={20} />,
          number: 25,
          title: "Top Products",
          percenteg: "+ 2.5%",
        };
        break;
    }

    return (
      <Row className="align-items-center justify-content-around">
        <Col md={2}>
          <div className="Card_icon" style={{ color: iconColor }}>
            {boxData.icon}
          </div>
        </Col>
        <Col md={9}>
          <Row>
            <Col md={6}>
              <h2>{boxData.number}</h2>
            </Col>
            <Col md="auto">
              <div
                className={
                  boxData.percenteg.startsWith("+")
                    ? "card_Percentage text-success"
                    : "card_Percentage text-danger"
                }
              >
                {boxData.percenteg}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="m-0" style={{ color: "#505050" }}>
                {boxData.title}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };
  return (
    <>
      <Row>
        <Col md={3}>
          <Card style={{ backgroundColor: Colors.Dashboard.Cards.Products }}>
            {GetInnerData("Products", Colors.Dashboard.Cards.Products)}
          </Card>
        </Col>
        <Col md={3}>
          <Card style={{ backgroundColor: Colors.Dashboard.Cards.Orders }}>
            {GetInnerData("Orders", Colors.Dashboard.Cards.Orders)}
          </Card>
        </Col>
        <Col md={3}>
          <Card
            style={{ backgroundColor: Colors.Dashboard.Cards.CanceledOrders }}
          >
            {GetInnerData(
              "CanceledOrders",
              Colors.Dashboard.Cards.CanceledOrders
            )}
          </Card>
        </Col>
        <Col md={3}>
          <Card style={{ backgroundColor: Colors.Dashboard.Cards.TopOrders }}>
            {GetInnerData("TopOrders", Colors.Dashboard.Cards.TopOrders)}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
