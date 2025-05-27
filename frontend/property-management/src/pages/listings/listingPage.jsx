import React from "react";
import Sidebar from "../landingPage/components/Sidebar";
import Navbar from "../landingPage/components/Navbar";
import styles from "./listingPage.module.css";
import Category from "./components/Category";
import Property_grid from "./components/Property_grid";


function Listings() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <main className={styles.mainContainer}>
        <Sidebar />
        <div className={styles.contentContainer}>
          <Navbar />
          <Property_grid/>
        </div>
      </main>
    </>
  );
}

export default Listings;