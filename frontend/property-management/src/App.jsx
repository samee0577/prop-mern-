import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/landingPage/landingPage.jsx'
import SignUpForm from './pages/signUpPage/SignUpForm.jsx'
import Listings from './pages/listings/listingPage.jsx'
import LoginPage from './pages/loginPage/LoginPage.jsx'
import Profile from './pages/profilePage/profilePage.jsx'
import MyProperty from './pages/MyPropertyPage/myProperty.jsx'

function App() {

  console.log('rendering App')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<h1> 404 not found ,this page might be under production or not exist</h1>}></Route>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/listings" element={<Listings/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/myproperty" element={<MyProperty/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

