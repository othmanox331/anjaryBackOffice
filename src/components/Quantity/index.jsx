import React, { useState } from "react";

const Quantity = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [subtotal, setSubtotal] = useState(169.5);
  const [total, setTotal] = useState(169.5);

  const handleQuantityChange = (id, delta) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return {
          ...item,
          quantity: newQuantity,
          total: item.price * newQuantity,
        };
      }
      return item;
    });
    setCart(newCart);
    updateTotals(newCart);
  };

  const updateTotals = (cart) => {
    const newSubtotal = cart.reduce((acc, item) => acc + item.total, 0);
    setSubtotal(newSubtotal);
    setTotal(newSubtotal); // Update this logic if there are additional charges or discounts
  };

  return (
    <div className="item-quantity">
      <button onClick={() => handleQuantityChange(item.id, -1)}>&lt;</button>
      <span>{item.quantity}</span>
      <button onClick={() => handleQuantityChange(item.id, 1)}>&gt;</button>
    </div>
  );
};

export default Quantity;
