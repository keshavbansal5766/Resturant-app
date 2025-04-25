"use client";

import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import React from "react";
import UserSignUp from "../_components/UserSignUp";

const UserAuth = () => {
  return (
    <>
      <CustomerHeader />
      <div className="container">
        <h1>User</h1>
        <UserSignUp />
      </div>

      <Footer />
    </>
  );
};

export default UserAuth;
