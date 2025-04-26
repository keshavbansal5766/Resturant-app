"use client";

import React, { useEffect, useMemo, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState();
  const [cartData, setCartData] = useState();
  const [cartIds, setCardIds] = useState([]);
  const [removeCartData, setRemoveCartData] = useState();
  const router = useRouter();
  const [restData, setRestData] = useState([]);

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    loadRestaurants();
  }, []);
  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
    }
  };

  const data = useMemo(() => {
    if (
      restaurants.length > 0 &&
      cartStorage.length > 0 &&
      cartStorage[0]?.resto_id
    ) {
      return restaurants.filter((item) => item._id === cartStorage[0].resto_id);
    }
    return [];
  }, [restaurants, cartStorage]);

  useEffect(() => {
    if (data.length > 0) {
      setRestData(data);
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartStorage(JSON.parse(storedCart));
      }
    }
  }, []);

  useEffect(() => {
    if (cartStorage && cartStorage.length > 0) {
      setCardIds(cartStorage.map((item) => item._id));
    } else {
      setCardIds([]);
    }
  }, [cartStorage]);

  useEffect(() => {
    if (cartStorage?.length > 0) {
      const newTotal =
        cartStorage?.length === 1
          ? cartStorage[0]?.price
          : cartStorage.reduce((acc, item) => acc + item.price, 0);

      setTotal(newTotal);
    } else {
      setTotal(0); // in case it's empty
    }
  }, [cartStorage]);

  const addToCart = (item) => {
    setCartData(item);
    let localCartIds = cartIds;
    localCartIds.push(item._id);
    setCardIds(localCartIds);
    setRemoveCartData();
  };

  const removeFromCart = (id) => {
    if (cartIds.length === 1 && cartIds.includes(id)) {
      // Only one item left in selection, remove it from cartStorage too
      setCartStorage([]);
      localStorage.setItem("cart", JSON.stringify([]));
      setCardIds([]);
    } else {
      // Just update selection, don't remove from UI
      const updatedIds = cartIds.filter((itemId) => itemId !== id);
      setCardIds(updatedIds);
    }

    setRemoveCartData(id);
    setCartData(null);
  };

  console.log(restData.name);

  return (
    <>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="food-item-wrapper">
        {cartStorage?.length > 0 ? (
          cartStorage.map((item, i) => {
            return (
              <div className="list-item" key={i}>
                <div className="list-item-block-1">
                  <img src={item.img_path} alt="" />
                </div>
                <div className="list-item-block-2">
                  <div>{item.name}</div>
                  <div className="description">{item.description}</div>
                  {cartIds?.includes(item._id) ? (
                    <button onClick={() => removeFromCart(item._id)}>
                      Remove From Cart
                    </button>
                  ) : (
                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                  )}
                </div>
                <div className="list-item-block-3">Price: {item.price}</div>
              </div>
            );
          })
        ) : (
          <h1>No Food Item Added Now</h1>
        )}
      </div>
      <div className="total-wrapper">
        <div className="block-1">
          <div className="row">
            <span>Food Charges: </span>
            <span>{total}</span>
          </div>
          <div className="row">
            <span>Tax Price: </span>
            <span>{!isNaN(total) ? (total * TAX) / 100 : "0.00"}</span>
          </div>
          <div className="row">
            <span>Delivery Charges: </span>
            <span>{total ? DELIVERY_CHARGES : 0}</span>
          </div>
          <div className="row">
            <span>Total Amount: </span>
            <span>
              {total +
                (total ? DELIVERY_CHARGES : 0) +
                (!isNaN(total) ? (total * TAX) / 100 : "0.00")}
            </span>
          </div>
        </div>
        <div className="block-2">
          <button>Order Now</button>
          <div
            onClick={() =>
              router.push(
                "../explore/" + restData[0]?.name + "?id=" + restData[0]?._id
              )
            }
          >
            Go To restaurant
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
