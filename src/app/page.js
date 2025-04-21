import Image from "next/image";
import styles from "./page.module.css";
import Restaurant from "./restaurant/page";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            className="select-input"
            placeholder="Select place"
          />
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
