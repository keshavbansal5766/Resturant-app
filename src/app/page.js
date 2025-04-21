import Image from "next/image";
import styles from "./page.module.css";
import Restaurant from "./restaurant/page";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main>
      <CustomerHeader />
      <h1>Restaurant App</h1>
      <Footer />
    </main>
  );
}
