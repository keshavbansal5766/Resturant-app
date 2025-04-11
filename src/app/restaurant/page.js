"use client";

import React, { useState } from "react";
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantSignUp from "../_components/restaurantSignUP";

const Restaurant = () => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <h1>Restaurant Login/Signup pages</h1>
      <RestaurantLogin />
      <RestaurantSignUp />
      <button>Already have Account? SignUp</button>
    </>
  );
};

export default Restaurant;
