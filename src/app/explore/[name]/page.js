"use client";

import React, { use, useEffect, useState } from "react";

const page = ({ params, searchParams }) => {
  const [restaurantDetails, setRestaurantDetails] = useState("");
  const [foodItems, setFoodItems] = useState([]);

  const { name } = use(params);
  const { id } = use(searchParams);

  useEffect(() => {
    loadRestaurantDetail();
  }, []);

  const loadRestaurantDetail = async () => {
    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.details);
      setFoodItems(response.foodItems);
    }
  };

  return (
    <>
      <div className="restaurant-page-banner">
        <h1>{decodeURI(name)}</h1>
      </div>
      <div>
        <h3>{restaurantDetails?.contact}</h3>
        <h3>{restaurantDetails?.city}</h3>
        <h3>{restaurantDetails?.address}</h3>
        <h3>{restaurantDetails?.email}</h3>
      </div>
      <div>
        {foodItems.map((item, i) => {
          return (
            <div key={i}>
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>{item.description}</div>
              <img src={item.img_path} alt="" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
