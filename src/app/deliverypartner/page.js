"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const deliveryPartner = () => {
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [signupMobile, setSignupMobile] = useState("");
  const router = useRouter();

  const handleLogin = () => {};
  const handleSignUp = () => {};
  return (
    <div>
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
              value={signupMobile}
              className="input-field"
              onChange={(e) => setSignupMobile(e.target.value)}
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

export default deliveryPartner;
