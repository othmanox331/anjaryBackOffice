import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Modal,
  Quantity,
  Input,
  Select,
  MoreDropDown,
} from "@components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StyledEngineProvider } from "@mui/material/styles";
import { FaPlus } from "react-icons/fa";
import { APIs } from "@services";
import Badge from "react-bootstrap/Badge";

import "./index.css";
import { Bounce, toast } from "react-toastify";

const TableHeaderData = [
  {
    id: "fuulName",
    numeric: false,
    disablePadding: true,
    label: "FullName",
  },
  {
    id: "phoneNumber",
    numeric: false,
    disablePadding: true,
    label: "PhoneNumber",
  },
  {
    id: "city",
    numeric: false,
    disablePadding: true,
    label: "City",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: true,
    label: "Actions",
  },
];
const Ordes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [FullName, setFullName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [City, setCity] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [Address, setAddress] = useState("");
  const [Address2, setAddress2] = useState("");
  const [Products, setProducts] = useState([]);
  const [SelectProducts, setSelectProducts] = useState([]);
  const [TableData, setTableData] = useState([]);
  const [TableHeader, setTableHeader] = useState(TableHeaderData);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await APIs.Order.List();
      const formattedData = data.map((order) => ({
        ...order,
        status: (
          <div className={"order_status_" + order.status}>
            {getStatu(order.status)}
          </div>
        ),
        actions: <MoreDropDown />,
      }));
      setTableData(formattedData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    const products = await APIs.Product.SelectList();
    setSelectProducts(products);
  };

  const getStatu = (statu) => {
    if (statu == 1) {
      return (
        <Badge
          bg="success"
          className="d-flex align-items-center justify-content-center w-25"
          style={{ minWidth: "50px", minHeight: "20px" }}
        >
          Confirmed
        </Badge>
      );
    } else if (statu == 0) {
      return (
        <Badge
          bg="secondary"
          className="d-flex align-items-center justify-content-center w-25"
          style={{ minWidth: "50px", minHeight: "20px" }}
        >
          Sent
        </Badge>
      );
    }
  };

  const onchangeFullName = (value) => {
    setFullName(value);
  };
  const onchangeCity = (value) => {
    setCity(value);
  };
  const onchangePostalCode = (value) => {
    setPostalCode(value);
  };
  const onchangeAddress = (value) => {
    setAddress(value);
  };
  const onchangeAddress2 = (value) => {
    setAddress2(value);
  };
  const onchangePhoneNumber = (value) => {
    setPhoneNumber(value);
  };
  const onPruductchange = (event, value) => {
    setProducts(value);
  };

  const Addorder = async () => {
    if (
      await APIs.Order.Add({
        fuulName: FullName,
        phoneNumber: PhoneNumber,
        city: City,
        postalCode: PostalCode,
        address: Address,
        address2: Address2,
        Products_Ids: Products.map((item) => item.value),
      })
    ) {
      toast.success("Order Added successfully", {
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

      fetchOrders();
      setIsModalOpen(false);
      clearModal();
    } else {
      toast.error("Somthing vad happend", {
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

  const clearModal = () => {
    setFullName("");
    setPhoneNumber("");
    setCity("");
    setPostalCode("");
    setAddress("");
    setAddress2("");
    setProducts([]);
  };

  return (
    <Card>
      <Row>
        <Col>
          <h2>Orders list</h2>
        </Col>
        <Col md="auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-success"
          >
            <FaPlus />
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledEngineProvider>
            <Table
              rows={TableData}
              headCells={TableHeader}
              initialOrder="asc"
              initialOrderBy="id"
              initialRowsPerPage={10}
              toolbarTitle="Order"
            />
          </StyledEngineProvider>
        </Col>
      </Row>
      <Modal
        title="Add Order"
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        onSave={Addorder}
      >
        <Row>
          <Col md={12}>
            <Input
              Label={"FullName :"}
              type={"text"}
              value={FullName}
              onChangeText={(value) => onchangeFullName(value)}
            />
          </Col>
          <Col md={12}>
            <Input
              Label={"PhoneNumber :"}
              type={"text"}
              value={PhoneNumber}
              onChangeText={(value) => onchangePhoneNumber(value)}
            />
          </Col>
          <Col md={6}>
            <Input
              Label={"CodePostal :"}
              type={"text"}
              value={PostalCode}
              onChangeText={(value) => onchangePostalCode(value)}
            />
          </Col>
          <Col md={6}>
            <Input
              Label={"City :"}
              type={"text"}
              value={City}
              onChangeText={(value) => onchangeCity(value)}
            />
          </Col>
          <Col md={12}>
            <Input
              Label={"Address :"}
              type={"text"}
              value={Address}
              onChangeText={(value) => onchangeAddress(value)}
            />
          </Col>
          <Col md={12}>
            <Input
              Label={"Address2 :"}
              type={"text"}
              value={Address2}
              onChangeText={(value) => onchangeAddress2(value)}
            />
          </Col>
          <Col md={12}>
            <Select
              data={SelectProducts}
              Label={"Products : "}
              onvaluechange={onPruductchange}
              Multiple
            />
          </Col>
          <Col md={12}>
            {Products.map((product) => {
              <Row>
                <Col>{product.label}</Col>
                <Col md="auto">
                  <Row>
                    <Col md={12}>Quantity</Col>
                    <Col md={12}>{/* <Quantity /> */}</Col>
                  </Row>
                </Col>
              </Row>;
            })}
          </Col>
        </Row>
      </Modal>
    </Card>
  );
};

export default Ordes;
