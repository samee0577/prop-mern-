import React from "react";
import styles from "./landingPage.module.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import FrontPage from "./components/FrontPage";
import NavigationSection from "./components/NavigationSection";

function LandingPage() {
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
          <FrontPage />
          <NavigationSection />
        </div>
      </main>
    </>
  );
}

export default LandingPage;
