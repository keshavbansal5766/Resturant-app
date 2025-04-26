"use client";

import React, { useEffect, useMemo, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState();
  const [userStorage, setUserStorage] = useState();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserStorage(JSON.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartStorage(JSON.parse(storedCart));
      }
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

      <div className="total-wrapper">
        <div className="block-1">
          <h2>User Details</h2>
          <div className="row">
            <span>Name:</span>
            <span>{userStorage?.name}</span>
          </div>
          <div className="row">
            <span>Address:</span>
            <span>{userStorage?.address}</span>
          </div>
          <div className="row">
            <span>Contact:</span>
            <span>{userStorage?.contact}</span>
          </div>
          <h2>Amount Details</h2>
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
            <span>{total ? DELIVERY_CHARGES : 0}</span>
          </div>
          <div className="row">
            <span>Total Amount: </span>
            <span>
              {total +
                (total ? DELIVERY_CHARGES : 0) +
                (!isNaN(total) ? (total * TAX) / 100 : "0.00")}
            </span>
          </div>
          <h2>Payment Method</h2>
          <div className="row">
            <span>Cash on Delivery:</span>
            <span>
              {total +
                (total ? DELIVERY_CHARGES : 0) +
                (!isNaN(total) ? (total * TAX) / 100 : "0.00")}
            </span>
          </div>
        </div>
        <div className="block-2">
          <button>Place Your Order Now</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
