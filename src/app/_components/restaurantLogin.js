import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [invalidError, setInvalidError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({ email, password, login: true }),
    });

    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    } else {
      setInvalidError(true);
    }
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
          {invalidError && (
            <span className="input-error">Invalid Credentials</span>
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
          {invalidError && (
            <span className="input-error">Invalid Credentials</span>
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
