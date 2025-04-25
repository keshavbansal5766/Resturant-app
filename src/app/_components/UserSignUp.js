import React, { useState } from "react";
import CustomerHeader from "./CustomerHeader";

const UserSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const handleSignUp = () => {
    console.log(name, email, password, confirmPassword, city, address, contact);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCity("");
    setAddress("");
    setContact("");
  };

  return (
    <div>
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
          value={email}
          className="input-field"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
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
        <input
          type="text"
          value={contact}
          className="input-field"
          onChange={(e) => setContact(e.target.value)}
          placeholder="Enter Contact No."
        />
      </div>
      <div className="input-wrapper">
        <button onClick={handleSignUp} className="button">
          SignUp
        </button>
      </div>
    </div>
  );
};

export default UserSignUp;
