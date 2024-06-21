import React, { useState } from "react";
import CategoryTable from "./CategoryTable";
import { Card, Modal } from "@components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StyledEngineProvider } from "@mui/material/styles";
import { FaPlus } from "react-icons/fa";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";

const Categories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryInputs, setCategoryInputs] = useState({
        name: "",
        isHome: false,
        title: ""
    });

    // Sample category data
    const categories = [
        {
            id: 1,
            name: "Category 1",
            isHome: true,
            title: "Home Category 1",
        },
        {
            id: 2,
            name: "Category 2",
            isHome: false,
            title: "Category 2",
        },
        {
            id: 3,
            name: "Category 3",
            isHome: false,
            title: "Category 3",
        },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCategoryInputs({ ...categoryInputs, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = () => {
        // Handle adding the new category (this should update your category list)
        setIsModalOpen(false);
    };

    return (
        <div className="category__container">
            <Card>
                <Row>
                    <Col>
                        <h2>Category List</h2>
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
                            <CategoryTable categories={categories} />
                        </StyledEngineProvider>
                    </Col>
                </Row>
            </Card>
            <Modal
                title="Add Category"
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
                onSave={handleSubmit}
            >
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={categoryInputs.name}
                    onChange={handleChange}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={categoryInputs.isHome}
                            onChange={handleChange}
                            name="isHome"
                            color="primary"
                        />
                    }
                    label="Is Home"
                />
                <TextField
                    margin="dense"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    value={categoryInputs.title}
                    onChange={handleChange}
                />
            </Modal>
        </div>
    );
};

export default Categories;
