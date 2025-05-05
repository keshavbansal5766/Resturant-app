"use client";

import React, { useEffect, useState } from "react";
import DeliveryPartnerHeader from "../_components/DeliveryPartnerHeader";
import { useRouter } from "next/navigation";

const DeliveryDashboard = () => {
  const router = useRouter();

  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    const deliveryData =
      localStorage.getItem("deliveryPartner") &&
      JSON.parse(localStorage.getItem("deliveryPartner"));

    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/orders/" + deliveryData?._id
    );

    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const deliveryPartner = JSON.parse(
        localStorage.getItem("deliveryPartner")
      );

      if (!deliveryPartner) {
        router.push("deliverypartner");
      }
    }
  });

  return (
    <>
      <DeliveryPartnerHeader />
      <h1>Delivery Dashboard</h1>

      {myOrders &&
        myOrders.map((myOrder, i) => (
          <div className="restaurant-wrapper profile-wrapper" key={i}>
            <h4>Name: {myOrder.data.name}</h4>
            <div>Amount: {myOrder.amount}</div>
            <div>Address: {myOrder.data.address}</div>
            <div>Status: {myOrder.status}</div>
            <div>Contact: {myOrder.data.contact}</div>
            <div>
              Update Status{" "}
              <select name="" id="">
                <option>Confirm</option>
                <option>On the way</option>
                <option>Delivered</option>
                <option>Failed to Deliver</option>
              </select>
            </div>
          </div>
        ))}
    </>
  );
};

export default DeliveryDashboard;
