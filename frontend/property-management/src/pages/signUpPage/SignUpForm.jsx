"use client";
import React, { useState, useEffect } from "react";
import styles from "./SignUpForm.module.css";
import { Link } from "react-router-dom";
import BackArrow from "../../components/BackArrow";
import FormSection from "../../components/FormSection";

function SignUpForm() {

const [fadeIn, setFadeIn] = useState(false);

const signupStyles = {
  contentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1040px",
    height: "calc(100vh - 20px)",
    margin: "auto",
    gap: "1.9rem",
    overflow: "hidden",
    opacity: fadeIn ? 1 : 0,
    transition: "opacity 0.6s ease-in-out"
  }
};
  
  useEffect(() => {
    // Enable fade-in effect after component mounts
    setFadeIn(true);
  }, []);
  
  return (
    <main className={styles.container}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inria+Sans:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
      <Link to="/">
        <BackArrow />
      </Link>
      <section style={signupStyles.contentWrapper}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad401775897b826ee0f556028c422d3259ec080c"
          alt="Login illustration"
          className={styles.loginImage}
        />
        <section className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <header className={styles.headerSection}>
              <h1 className={styles.title}>sign-up</h1>
              {/* <h1 className={styles.mainTitle}>create a account</h1> */}
              <p className={styles.loginPrompt}>
                already have an account? <Link to="/login">log in</Link>
              </p>
            </header>
            <FormSection/>
          </div>
        </section>
      </section>
    </main>
  );
}

export default SignUpForm;
