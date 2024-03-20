import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
const backendBaseUrl = 'http://localhost:3000';

const Navbar = () => {

    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [token, setToken] = useState(localStorage.getItem("auth0_id"));
    const [doctor, setDoctor] = useState(localStorage.getItem("doctor"));
    const [patient, setPatient] = useState(localStorage.getItem("patient"));

    const getUserType = async () => {
        try {
            const { data } = await axios.get(`${backendBaseUrl}/api/userinfo`, {
                headers: {
                    authorization: localStorage.getItem('auth0_id')
                }
            });
            if (data.role === 'doctor') {
                localStorage.setItem("doctor", data.doctor._id);
                localStorage.removeItem("patient");
                setDoctor(() => data.doctor._id);
            } else if (data.role === 'patient'){
                localStorage.setItem("patient", data.patient._id);
                localStorage.removeItem("doctor");
                setPatient(() => data.patient._id);
            }
        } catch (error) {
            console.log(error);
        }
}

useEffect(() => {
    if (isAuthenticated) {
        const token = user.sub;
        localStorage.setItem("auth0_id", token);
        setToken(() => token);
        getUserType();
    }
}, [user, isAuthenticated])

const handleLogin = async () => {
    await loginWithRedirect();
}
const handleLogout = async () => {
    await logout();
    localStorage.removeItem("auth0_id");
    localStorage.removeItem("doctor");
    localStorage.removeItem("patient");
}

return (
    <>
        <div>
            {isAuthenticated ? (
                <button onClick={() => handleLogout()}>logout</button>
            ) : (
                <button onClick={() => handleLogin()}>login</button>
            )}
        </div>
        <div>
            {isAuthenticated && !(doctor || patient) && (
                <div>
                    <button onClick={() => window.location.href = '/register/doctor'}> Register as Doctor</button>
                    <button onClick={() => window.location.href = '/register/patient'}> Register as Patient</button>
                </div>
            )}
        </div>
        <div>
            {doctor && isAuthenticated && (
                <span>Doctor</span>
            )}
            {patient && isAuthenticated && (
                <span>Patient</span>
            )}
        </div>
    </>
);
}

export default Navbar;