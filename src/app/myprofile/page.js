"use client";

import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const myProfile = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    const userStorage = JSON.parse(localStorage.getItem("user"));

    let response = await fetch(
      "http://localhost:3000/api/order?id=" + userStorage._id
    );

    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
  };

  console.log(myOrders);

  return (
    <div>
      <CustomerHeader />
      {myOrders &&
        myOrders.map((myOrder, i) => (
          <div className="restaurant-wrapper profile-wrapper" key={i}>
            <h4>Name: {myOrder.data.name}</h4>
            <div>Amount: {myOrder.amount}</div>
            <div>Address: {myOrder.data.address}</div>
            <div>Status: {myOrder.status}</div>
            <div>Contact: {myOrder.data.contact}</div>
          </div>
        ))}
      <Footer />
    </div>
  );
};

export default myProfile;
