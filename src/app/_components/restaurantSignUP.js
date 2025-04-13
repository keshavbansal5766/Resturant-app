import React, { useState } from "react";

const RestaurantSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const handleSignUp = async () => {
    let result = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({ email, password, name, city, address, contact }),
    });

    result = await result.json();

    if (result.success) {
      alert("Restaurant Registered Successfully");
    }

    setEmail("");
    setPassword("");
    setC_password("");
    setName("");
    setCity("");
    setAddress("");
    setContact("");
  };
  return (
    <>
      {" "}
      <h3>SignUp Component</h3>
      <div>
        <div className="input-wrapper">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            type="text"
            placeholder="Enter email id"
          />
        </div>
        <div className="input-wrapper">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div className="input-wrapper">
          <input
            value={c_password}
            onChange={(e) => setC_password(e.target.value)}
            className="input-field"
            type="password"
            placeholder="Confirm password"
          />
        </div>
        <div className="input-wrapper">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            type="text"
            placeholder="Enter resturant name "
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Enter city"
          />
        </div>
        <div className="input-wrapper">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-field"
            type="text"
            placeholder="Enter full address"
          />
        </div>
        <div className="input-wrapper">
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="input-field"
            type="text"
            placeholder="Enter contact No."
          />
        </div>
        <div className="input-wrapper">
          <button onClick={handleSignUp} className="button">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignUp;
