import Link from "next/link";
import React, { useEffect, useState } from "react";

const CustomerHeader = ({ cartData, removeCartData }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    }
  }, []);

  // Update cart when cartData changes
  useEffect(() => {
    if (!cartData) return;

    setCartItems((prevCart) => {
      const isSameResto = prevCart[0]?.resto_id === cartData.resto_id;

      const updatedCart = isSameResto
        ? [...prevCart, { ...cartData }]
        : [{ ...cartData }];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, [cartData]);

  useEffect(() => {
    if (removeCartData) {
      let localCartItem = cartItems.filter((item) => {
        return item._id !== removeCartData;
      });
      setCartItems(localCartItem);
      localStorage.setItem("cart", JSON.stringify(localCartItem));
      if (localCartItem.length === 0) {
        localStorage.removeItem("cart");
      }
    }
  }, [removeCartData]);

  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          src="https://png.pngtree.com/template/20200610/ourmid/pngtree-food-delivery-logo-design-image_381319.jpg"
          alt=""
        />
      </div>
      <ul>
        <li>
          <Link href="">Home</Link>
        </li>
        <li>
          <Link href="">Login</Link>
        </li>
        <li>
          <Link href="">Sign Up</Link>
        </li>
        <li>
          <Link href="">Cart({cartItems ? cartItems.length : 0})</Link>
        </li>
        <li>
          <Link href="">Add Resturant</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
