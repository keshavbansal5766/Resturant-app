"use client";

import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import React, { useState } from "react";
import UserSignUp from "../_components/UserSignUp";
import UserLogin from "../_components/UserLogin";

const UserAuth = () => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <CustomerHeader />
      <div className="container">
        <h1>{login ? "User Login" : "User SignUp"}</h1>
        {login ? <UserLogin /> : <UserSignUp />}
        <button className="button-link" onClick={() => setLogin(!login)}>
          {login ? "Do not have account? Signup" : "Already Have an account? Login"}
        </button>
      </div>

      <Footer />
    </>
  );
};

export default UserAuth;
