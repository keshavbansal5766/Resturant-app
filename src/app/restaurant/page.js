"use client";
import React, { useEffect, useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import ResturantHeader from "../_components/RestaurantHeader";
import "./style.css";
import RestaurantFooter from "../_components/RestaurantFooter";

const Restaurant = () => {
  const [login, setLogin] = useState(true);


  return (
    <>
      <ResturantHeader />
      <div className="container">
        <h1>Restaurant Login/Signup pages</h1>

        {login ? <RestaurantLogin /> : <RestaurantSignUp />}
        <div>
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login
              ? "Do Not Have Account? SignUp"
              : "Already Have Account? Login"}
          </button>
        </div>
      </div>
      <RestaurantFooter />
    </>
  );
};

export default Restaurant;
