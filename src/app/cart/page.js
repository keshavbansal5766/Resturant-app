"use client";

import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const Cart = () => {
  const [cartStorage, setCartStorage] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });


  return (
    <>
      <CustomerHeader />
      <div className="food-item-wrapper">
        {cartStorage.length > 0 ? (
          cartStorage.map((item, i) => {
            return (
              <div className="list-item" key={i}>
                <div className="list-item-block-1">
                  <img src={item.img_path} alt="" />
                </div>
                <div className="list-item-block-2">
                  <div>{item.name}</div>
                  <div className="description">{item.description}</div>
                  {
                    <button onClick={() => removeFromCart(item._id)}>
                      Remove From Cart
                    </button>
                  }
                </div>
                <div className="list-item-block-3">Price: {item.price}</div>
              </div>
            );
          })
        ) : (
          <h1>No Food Item Added Now</h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
