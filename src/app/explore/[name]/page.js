import React, { useEffect } from "react";

const page = async ({ params }) => {
  const { name } = await params;

  useEffect(() => {
    loadFoodItem();
  }, []);

  const loadFoodItem = async (id) => {
    let response = await fetch("http://localhost:3000/api/customer/" + id);
  };

  return (
    <div className="restaurant-page-banner">
      <h1>{decodeURI(name)}</h1>
    </div>
  );
};

export default page;
