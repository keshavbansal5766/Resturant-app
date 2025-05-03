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
  const [removeUserCartData, setRemoveUserCartData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedCart = localStorage.getItem("cart");
      if (storedUser) {
        setUserStorage(JSON.parse(storedUser));
      }
      if (storedCart) {
        setCartStorage(JSON.parse(storedCart));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      const parsed = storedCart ? JSON.parse(storedCart) : null;
      if (!parsed || parsed.length === 0) {
        router.push("/");
      }
    }
  }, [total]);

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

  const orderNow = async () => {
    let user_id = userStorage?._id;
    let cart = cartStorage;
    let foodItemIds = cart.map((item) => item._id).toString();
    let resto_id = cart[0]?.resto_id;
    let deliveryBoy_id = "68062457be843830c97ac113";

    let collection = {
      user_id,
      resto_id,
      foodItemIds,
      deliveryBoy_id,
      status: "confirm",
      amount: total + DELIVERY_CHARGES + (total * TAX) / 100,
    };
    let response = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      body: JSON.stringify(collection),
    });

    response = await response.json();
    if (response.success) {
      alert("order confirm");
      setRemoveUserCartData(true);
      router.push("myprofile");
    } else {
      alert("order failed");
    }
  };

  console.log(cartStorage);

  return (
    <>
      <CustomerHeader removeUserCartData={removeUserCartData} />

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
          <button onClick={orderNow}>Place Your Order Now</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
