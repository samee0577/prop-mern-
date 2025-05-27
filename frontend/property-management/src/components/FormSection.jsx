"use client";
import React from "react";
import { useState , useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "../pages/signUpPage/SignUpForm.module.css";

function FormSection() {

  const navigate = useNavigate();
  // Create state for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [viewPass, setViewPass] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted");
  
  // Form validation
  if (!firstName || !lastName || !email || !password) {
    setMessage("All fields are required");
    return;
  }
  
  if (!agreeToTerms) {
    setMessage("You must agree to terms and conditions");
    return;
  }
  
  // Combine first name and last name for the backend
  const name = `${firstName} ${lastName}`;
  
  // Data to send to backend
  const userData = {
    name,
    email,
    password
  };
  
  console.log("Data to send to backend:", userData);

  setIsLoading(true);
  setMessage("");
  setIsError(false);

  try {
    const response = await axios.post(`http://localhost:3000/api/auth/signup`, {
      name,
      email,
      password
    });
    console.log("Response from backend:", response.data);

    //store the token in local storage
    localStorage.setItem("token", response.data.token);

    // successful response
    setMessage("Account created successfully! You can now log in.");
    setIsError(false);

    // Reset form to empty
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setAgreeToTerms(false);

    //navigation
    setTimeout(() => {
      navigate("/");
    }, 1500);

  } catch (error) {
    
    // Handle error
    console.error("Signup error:", error);

    // Get error message from API response if available
    const errorMessage = error.response?.data?.message || "Failed to create account";
    setMessage(errorMessage);
    setIsError(true);
  } finally{
    setIsLoading(false);
  }

};

  return (
    <form className={styles.formFields} onSubmit={handleSubmit}>
      {message && (
        <div
          className={styles.message}
          style={{
            color: message === "Form validation successful!" ? "green" : undefined,
          }}
        >
          {message}
        </div>
      )}
      
      <div className={styles.nameFieldsRow}>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="first name"
            className={styles.textInput}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="last name"
            className={styles.textInput}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      
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
        <input type="checkbox" className={styles.checkbox} onClick={() => setViewPass(!viewPass)} /> 
      </div>
      
      <div className={styles.termsContainer}>
        <label className={styles.termsLabel}>
          <input 
            type="checkbox" 
            className={styles.checkbox}
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
          />
          <span className={styles.termsText}>
            i agree to the terms and conditions
          </span>
        </label>
      </div>
      <button 
        type="submit" 
        className={styles.createAccountButton}
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}

export default FormSection;
