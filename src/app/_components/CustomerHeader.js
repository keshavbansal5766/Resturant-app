"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CustomerHeader = ({ cartData, removeCartData, removeUserCartData }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

  const handleLogOut = () => {
    localStorage.removeItem("user");
    router.push("/user-auth");
  };

  useEffect(() => {
    if (removeUserCartData) {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  }, [removeUserCartData]);

  return (
    <div className="header-wrapper">
      <div className="logo">
        <Link href="/">
          <img
            src="https://png.pngtree.com/template/20200610/ourmid/pngtree-food-delivery-logo-design-image_381319.jpg"
            alt=""
          />
        </Link>
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/myprofile">{user?.name}</Link>
            </li>
            <li>
              <button onClick={handleLogOut}>LogOut</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/user-auth">Login</Link>
            </li>
            <li>
              <Link href="/user-auth">Sign Up</Link>
            </li>
          </>
        )}
        <li>
          <Link href={cartItems.length > 0 ? "/cart" : "#"}>
            Cart({cartItems ? cartItems.length : 0})
          </Link>
        </li>
        <li>
          <Link href="">Add Resturant</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
