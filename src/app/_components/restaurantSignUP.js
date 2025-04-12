import React from "react";

const RestaurantSignUp = () => {
  return (
    <>
      {" "}
      <h3>SignUp Component</h3>
      <div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter email id"
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="password"
            placeholder="Confirm password"
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter resturant name "
          />
        </div>
        <div className="input-wrapper">
          <input className="input-field" type="text" placeholder="Enter city" />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter full address"
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="number"
            placeholder="Enter contact No."
          />
        </div>
        <div className="input-wrapper">
          <button className="button">Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignUp;
