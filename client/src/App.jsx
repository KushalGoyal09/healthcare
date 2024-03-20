import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import RegisterDoctor from "./pages/RegisterDoctor";
import RegisterPatient from "./pages/RegisterPatient";
import NotFoundPage from "./pages/Notfound";
import HomePage from "./pages/HomePage";
import Chat from "./pages/Chat";
import DoctorDetails from "./pages/DoctorDetails";
import Meet from "./pages/Meet";
import RazorpayCheckout from "./components/Razorpay";
import PatientDashboard from "./components/PatientDashboard";
import Dashboard from "./pages/DashBoard";
import DoctorRatingPopup from "./components/Rating";

function App() {

  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register/doctor" element={< RegisterDoctor />} />
          <Route path="/register/patient" element={< RegisterPatient />} />
          <Route path="/" element={< HomePage />} />
          <Route path="/chat" element={< Chat />} />
          <Route path="/doctor/:doctorID" element={< DoctorDetails />} />
          <Route path="/meet/:meetId" element={< Meet />} />
          <Route path="/dash" element={< Dashboard />} />
          <Route path="/rating" element={< DoctorRatingPopup />} />
          <Route path="/*" element={< NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App