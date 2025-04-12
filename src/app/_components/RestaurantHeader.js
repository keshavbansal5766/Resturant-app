import Link from "next/link";
import React from "react";

const ResturantHeader = () => {
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          style={{ width: 200 }}
          src="https://png.pngtree.com/template/20200610/ourmid/pngtree-food-delivery-logo-design-image_381319.jpg"
          alt=""
        />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Login/SignUp</Link>
        </li>
        <li>
          <Link href="/">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default ResturantHeader;
