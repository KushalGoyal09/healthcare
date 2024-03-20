import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slot from './Slot';
const backendBaseUrl = 'http://localhost:3000';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentVisit, setCurrentVisit] = useState({ _id: null, patient: { name: null } });
    const [date, setDate] = useState(null);

    const fetchAppointments = async () => {
        try {
            const { data } = await axios.post(`${backendBaseUrl}/api/dashboard/doctor`, {
                currentDate: new Date()
            }, {
                headers: {
                    authorization: localStorage.getItem('auth0_id')
                }
            });
            setAppointments(data.visits);
            if (data.currentVisit) {
                setCurrentVisit(data.currentVisit);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    const joinMeet = (appointmentId) => {
        window.location.href = `/meet/${appointmentId}`;
    }

    const uniqueDates = [...new Set(appointments.map(appointment => new Date(appointment.slot.startTime).toDateString()))];

    return (
        <div>
            <h1> Dashboard</h1>
            <h2>Appointments</h2>
            {appointments.length === 0 && <p>No appointments</p>}
            {uniqueDates.map(uniqueDate => (
                <div key={uniqueDate}>
                    <h1>{uniqueDate}</h1>
                    {appointments.filter(appointment => new Date(appointment.slot.startTime).toDateString() === uniqueDate).map(filteredAppointment => (
                        <Slot
                            key={filteredAppointment._id}
                            startTime={filteredAppointment.slot.startTime}
                            endTime={filteredAppointment.slot.endTime}
                            isCurrent={currentVisit._id === filteredAppointment._id}
                            onClick={joinMeet}
                            name={filteredAppointment.patient.name}
                            id={filteredAppointment._id}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default PatientDashboard;
