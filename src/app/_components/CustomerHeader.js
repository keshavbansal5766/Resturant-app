import Link from "next/link";
import React, { useEffect, useState } from "react";

const CustomerHeader = ({ cartData }) => {
  const [cartStorage, setCartStorage] = useState([]);

  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartStorage(storedCart);
    }
  }, []);

  useEffect(() => {
    if (cartData) {
      if (cartNumber) {
        if (cartItem[0].resto_id !== cartData.resto_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([cartData]);
          localStorage.setItem("cart", JSON.stringify([cartData]));
        } else {
          let localCartItem = cartItem;
          localCartItem.push(JSON.parse(JSON.stringify(cartData)));
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1);
          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([cartData]);
        localStorage.setItem("cart", JSON.stringify([cartData]));
      }
    }
  }, [cartData]);

  console.log(cartItem);
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
          <Link href="">Cart({cartNumber ? cartNumber : 0})</Link>
        </li>
        <li>
          <Link href="">Add Resturant</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
