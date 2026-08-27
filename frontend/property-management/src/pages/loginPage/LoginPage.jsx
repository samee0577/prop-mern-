"use client";
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "../signUpPage/SignUpForm.module.css";
import BackArrow from "../../components/BackArrow";
import { BACKEND_URL } from "../../config/api";

function LoginPage() {
  const navigate = useNavigate();
  
  // Create state for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPass, setViewPass] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // Enable fade-in effect after component mounts
  React.useEffect(() => {
    setFadeIn(true);
  }, []);

  // Clear local storage when the page is mounted
  React.useEffect(() => {
    localStorage.clear();
  }, []);

  // Custom styles for login page layout (swapped positions)
  const loginStyles = {
    contentWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1040px",
      height: "calc(100vh - 20px)",
      margin: "auto",
      gap: "1.9rem",
      overflow: "hidden",
      flexDirection: "row-reverse", // This reverses the order
      opacity: fadeIn ? 1 : 0,
      transition: "opacity 0.6s ease-in-out"
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted");
    
    // Form validation
    if (!email || !password) {
      setMessage("Email and password are required");
      setIsError(true);
      return;
    }
    
    // Data to send to backend
    const userData = {
      email,
      password
    };
    
    console.log("Data to send to backend:", userData);

    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log("Response from backend:", response.data);

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);

      // successful response
      setMessage("Login successful!");
      setIsError(false);

      // Reset form to empty
      setEmail("");
      setPassword("");

      //navigation
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      // Handle error
      console.error("Login error:", error);

      // Get error message from API response if available
      const errorMessage = error.response?.data?.message || "Failed to login";
      setMessage(errorMessage);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inria+Sans:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
      <Link to="/">
      <BackArrow />
      </Link>
      <section style={loginStyles.contentWrapper}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad401775897b826ee0f556028c422d3259ec080c"
          alt="Login illustration"
          className={styles.loginImage}
        />
        <section className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <header className={styles.headerSection}>
              <h1 className={styles.title}>log in</h1>
              <p className={styles.loginPrompt}>
                don't have an account? <Link to="/signup">sign up</Link>
              </p>
            </header>
            
            <form className={styles.formFields} onSubmit={handleSubmit}>
              {message && (
                <div
                  className={styles.message}
                  style={{
                    color: isError ? "rgba(255, 45, 45, 0.85)" : "green",
                  }}
                >
                  {message}
                </div>
              )}
              
              <div className={styles.inputField}>
                <input 
                  type="email" 
                  placeholder="email" 
                  className={styles.textInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className={`${styles.inputField} ${styles.passwordField}`}>
                <input
                  type={viewPass ? "text" : "password"}
                  placeholder="enter your password"
                  className={styles.textInput}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                  type="checkbox" 
                  className={styles.checkbox} 
                  onClick={() => setViewPass(!viewPass)} 
                /> 
              </div>
              
              <button 
                type="submit" 
                className={styles.createAccountButton}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>  
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}

export default LoginPage;