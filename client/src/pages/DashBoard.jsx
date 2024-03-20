import React, { useState, useEffect } from "react";
import DoctorDashboard from "../components/DoctorDashboard";
import PatientDashboard from "../components/PatientDashboard";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('patient')) {
            setRole('patient');
        } else if (localStorage.getItem('doctor')) {
            setRole('doctor');
        }
    }, []);

    return (
        <>
        <Navbar />
        <div>
            {role === 'patient' && <PatientDashboard />}
            {role === 'doctor' && <DoctorDashboard />}
        </div>
        </>
    )
}

export default Dashboard;