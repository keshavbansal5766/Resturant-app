import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserLogin = ({ redirect }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleLogin = async () => {
    let response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (redirect?.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("Failed to login please try again with valid email and password");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <div className="input-wrapper">
        <input
          type="text"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-wrapper">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
  );
};

export default UserLogin;
