"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeliveryPartnerHeader from "../_components/DeliveryPartnerHeader";

const DeliveryPartner = () => {
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const deliveryPartner = JSON.parse(
        localStorage.getItem("deliveryPartner")
      );
      if (deliveryPartner) {
        router.push("deliverydashboard");
      }
    }
  }, []);

  const handleLogin = async () => {
    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/login",
      {
        method: "POST",
        body: JSON.stringify({ loginMobile, loginPassword }),
      }
    );
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("deliveryPartner", JSON.stringify(result));
      router.push("deliverydashboard");
    } else {
      alert("Failed to login please try again with valid mobile and password");
    }

    setLoginMobile("");
    setLoginPassword("");
  };

  const handleSignUp = async () => {
    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/signup",
      {
        method: "POST",
        body: JSON.stringify({
          name,
          mobile,
          password,
          city,
          address,
        }),
      }
    );

    response = await response.json();

    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("deliveryPartner", JSON.stringify(result));
      router.push("deliverydashboard");
    } else {
      alert("failed");
    }

    setName("");
    setMobile("");
    setPassword("");
    setConfirmPassword("");
    setCity("");
    setAddress("");
  };
  return (
    <div>
      <DeliveryPartnerHeader />
      <h1>Delivery Partner</h1>
      <div className="auth-container">
        <div className="login-wrapper">
          <h3>Login</h3>
          <div className="input-wrapper">
            <input
              type="text"
              value={loginMobile}
              placeholder="Enter Mobile No."
              onChange={(e) => setLoginMobile(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-wrapper">
            <input
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
              className="input-field"
            />
          </div>
          <div className="input-wrapper">
            <button onClick={handleLogin} className="button">
              Login
            </button>
          </div>
        </div>
        <div className="signup-wrapper">
          <h3>Sign Up</h3>
          <div className="input-wrapper">
            <input
              type="text"
              value={name}
              className="input-field"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              value={mobile}
              className="input-field"
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter Mobile No."
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              value={password}
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              value={confirmPassword}
              className="input-field"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              value={city}
              className="input-field"
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              value={address}
              className="input-field"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
            />
          </div>

          <div className="input-wrapper">
            <button onClick={handleSignUp} className="button">
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartner;
