import React from "react";
import Sidebar from "../landingPage/components/Sidebar";
import Navbar from "../landingPage/components/Navbar";
import styles from "./myProperty.module.css";
import AddProp from "./components/addProp.jsx";
import MyAddedProperty from "./components/myAddedProperty.jsx";

function MyProperty() {
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
          <MyAddedProperty />
          <AddProp />
        </div>
      </main>
    </>
  );
}

export default MyProperty;