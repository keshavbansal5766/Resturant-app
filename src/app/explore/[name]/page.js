import React from "react";

const page = async ({ params }) => {
  const { name } = await params;

  return (
    <div className="restaurant-page-banner">
      <h1>{decodeURI(name)}</h1>
    </div>
  );
};

export default page;
