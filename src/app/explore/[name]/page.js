"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import React, { use, useEffect, useState } from "react";

const page = ({ params, searchParams }) => {
  const [restaurantDetails, setRestaurantDetails] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });
  const [cartIds, setCardIds] = useState(
    cartStorage
      ? () =>
          cartStorage.map((item) => {
            return item._id;
          })
      : []
  );
  const [removeCartData, setRemoveCartData] = useState();

  console.log(cartIds);

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

  const addToCart = (item) => {
    setCartData(item);
    let localCartIds = cartIds;
    localCartIds.push(item._id);
    setCardIds(localCartIds);
    setRemoveCartData();
  };

  const removeFromCart = (id) => {
    setRemoveCartData(id);
    let localIds = cartIds.filter((item) => item !== id);
    setCartData();
    setCardIds(localIds);
  };

  return (
    <>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(name)}</h1>
      </div>
      <div className="detail-wrapper">
        <h4>Contact: {restaurantDetails?.contact}</h4>
        <h4>City: {restaurantDetails?.city}</h4>
        <h4>Address: {restaurantDetails?.address}</h4>
        <h4>Email: {restaurantDetails?.email}</h4>
      </div>
      <div className="food-item-wrapper">
        {foodItems.length > 0 ? (
          foodItems.map((item, i) => {
            return (
              <div className="list-item" key={i}>
                <div>
                  <img src={item.img_path} alt="" />
                </div>
                <div>
                  <div>{item.name}</div>
                  <div>{item.price}</div>
                  <div className="description">{item.description}</div>
                  {cartIds?.includes(item._id) ? (
                    <button onClick={() => removeFromCart(item._id)}>
                      Remove From Cart
                    </button>
                  ) : (
                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Food Item Added Now</h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default page;
