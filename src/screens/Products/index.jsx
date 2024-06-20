import React from "react";
import ProductTable from "./components/Products";

const Products = () => {
    // Sample product data
    const products = [
        {
            id: 1,
            name: "Product 1",
            description: "This is product 1",
            price: 100,
            stockQuantity: 50,
            isBestSeller: true,
            createDate: "2023-01-01",
            category: "Category 1"
        },
        {
            id: 2,
            name: "Product 2",
            description: "This is product 2",
            price: 200,
            stockQuantity: 30,
            isBestSeller: false,
            createDate: "2023-02-15",
            category: "Category 2"
        },
        {
            id: 3,
            name: "Product 3",
            description: "This is product 3",
            price: 300,
            stockQuantity: 20,
            isBestSeller: false,
            createDate: "2023-03-10",
            category: "Category 3"
        },
    ];

    return (
        <div className="product__container">
            <ProductTable products={products} />
        </div>
    );
};

export default Products;
