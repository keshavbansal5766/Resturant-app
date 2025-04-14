import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RestaurantSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignUp = async () => {
    if (password !== c_password) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }

    if (
      !email ||
      !password ||
      !c_password ||
      !name ||
      !city ||
      !address ||
      !contact
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({ email, password, name, city, address, contact }),
    });

    response = await response.json();

    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
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
          {error && !email && (
            <span className="input-error">Please enter email</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            type="password"
            placeholder="Enter password"
          />
          {passwordError && password && (
            <span className="input-error">
              Password and Confirm password not match
            </span>
          )}
          {error && !password && (
            <span className="input-error">Please enter password</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            value={c_password}
            onChange={(e) => setC_password(e.target.value)}
            className="input-field"
            type="password"
            placeholder="Confirm password"
          />
          {passwordError && c_password && (
            <span className="input-error">
              Password and Confirm password not match
            </span>
          )}
          {error && !c_password && (
            <span className="input-error">Please enter confirm password</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            type="text"
            placeholder="Enter resturant name "
          />
          {error && !name && (
            <span className="input-error">Please enter name</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Enter city"
          />
          {error && !city && (
            <span className="input-error">Please enter city</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-field"
            type="text"
            placeholder="Enter full address"
          />
          {error && !address && (
            <span className="input-error">Please enter address</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="input-field"
            type="text"
            placeholder="Enter contact No."
          />
          {error && !contact && (
            <span className="input-error">Please enter contact</span>
          )}
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
