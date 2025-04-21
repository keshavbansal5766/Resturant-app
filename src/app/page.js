"use client";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
  };

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            defaultValue={selectedLocation}
            onClick={() => setShowLocation(prev => !prev)}
            className="select-input"
            placeholder="Select place"
          />
          <ul className="location-list">
            {showLocation &&
              locations.map((item, i) => (
                <li onClick={() => handleListItem(item)} key={i}>
                  {item}
                </li>
              ))}
          </ul>
          <input
            type="text"
            className="search-input"
            placeholder="Enter food or resturant name"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
