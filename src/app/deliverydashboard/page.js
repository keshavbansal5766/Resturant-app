"use client";

import React, { useEffect } from "react";
import DeliveryPartnerHeader from "../_components/DeliveryPartnerHeader";
import { useRouter } from "next/navigation";

const DeliveryDashboard = () => {
  const router = useRouter();

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
    </>
  );
};

export default DeliveryDashboard;
