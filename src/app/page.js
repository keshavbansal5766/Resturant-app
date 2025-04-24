"use client";
import { useRouter } from "next/navigation";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
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
    loadRestaurants({ location: item });
  };

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

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            defaultValue={selectedLocation}
            onClick={() => setShowLocation((prev) => !prev)}
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
            onChange={(e) => loadRestaurants({ restaurant: e.target.value })}
            className="search-input"
            placeholder="Enter food or resturant name"
          />
        </div>
      </div>
      <div className="restaurant-list-container">
        {restaurants.map((item, i) => (
          <div
            onClick={() =>
              router.push("explore/" + item.name + "?id=" + item._id)
            }
            className="restaurant-wrapper"
            key={i}
          >
            <div className="heading-wrapper">
              <h3>{item.name}</h3>
              <h5>Contact: {item.contact}</h5>
            </div>
            <div className="address-wrapper">
              <div>
                City: {item.city.charAt(0).toUpperCase() + item.city.slice(1)},
              </div>
              <div>
                Address: {item.address}, Email: {item.email}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
