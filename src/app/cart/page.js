"use client";

import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";

const Cart = () => {
  const [cartStorage, setCartStorage] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartStorage(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cartStorage?.length > 0) {
      const newTotal =
        cartStorage?.length === 1
          ? cartStorage[0]?.price
          : cartStorage.reduce((acc, item) => acc + item.price, 0);

      setTotal(newTotal);
    } else {
      setTotal(0); // in case it's empty
    }
  }, [cartStorage]);

  return (
    <>
      <CustomerHeader />
      <div className="food-item-wrapper">
        {cartStorage?.length > 0 ? (
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
      <div className="total-wrapper">
        <div className="block-1">
          <div className="row">
            <span>Food Charges: </span>
            <span>{total}</span>
          </div>
          <div className="row">
            <span>Tax Price: </span>
            <span>{!isNaN(total) ? (total * TAX) / 100 : "0.00"}</span>
          </div>
          <div className="row">
            <span>Delivery Charges: </span>
            <span>{DELIVERY_CHARGES}</span>
          </div>
          <div className="row">
            <span>Total Amount: </span>
            <span>
              {total +
                DELIVERY_CHARGES +
                (!isNaN(total) ? (total * TAX) / 100 : "0.00")}
            </span>
          </div>
        </div>
        <div className="block-2">
          <button>Order Now</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
