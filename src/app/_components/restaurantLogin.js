import React, { useState } from "react";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    console.log(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h3>Login Component</h3>
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
          {error && !password && (
            <span className="input-error">Please enter password</span>
          )}
        </div>
        <div className="input-wrapper">
          <button onClick={handleLogin} className="button">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
