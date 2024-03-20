// payment gateway remaining
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rajorpay from '../components/Razorpay';
const backendBaseUrl = 'http://localhost:3000';

const DoctorDetails = () => {
    const { doctorID } = useParams();

    const [doctor, setDoctor] = useState(null);
    const [slots, setSlots] = useState([]);
    const [order, setOrder] = useState(null);
    const [success, setSuccess] = useState({
        success: false,
        index: -1
    });

    const getDoctorDetails = async () => {
        try {
            const { data } = await axios.post(`${backendBaseUrl}/api/doctor/${doctorID}`, { date: new Date() }, {
                headers: {
                    authorization: localStorage.getItem('auth0_id')
                }
            });
            setDoctor(() => data.doctor);
            setSlots(() => data.slots);
        } catch (error) {
            console.error(error);
        }
    }

    const bookSlot = async (startTime, endTime, index) => {
        try {
            const { data } = await axios.post(`${backendBaseUrl}/api/appointment`, {
                doctor_id: doctorID,
                startTime,
                endTime
            }, {
                headers: {
                    authorization: localStorage.getItem('auth0_id')
                }
            });
            setOrder(() => data.order);
            setSuccess({
                success: true,
                index: index
            });
        } catch (error) {
            setSuccess({
                success: false,
                index: index
            });
            console.log(error);
        }
    };

    useEffect(() => {
        getDoctorDetails();
    }, []);

    const renderSlots = () => {
        return slots.map((slot, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                <span>{slot.startTime} - {slot.endTime}</span>
                {slot.status === 'Available' ? (
                    <button
                        className="px-2 py-1 rounded bg-green-500 text-white w-20 text-center hover:bg-green-600 transition duration-300 ease-in-out" // Adjust button width here
                        onClick={() => bookSlot(slot.startTime, slot.endTime, index)}
                    >
                        {(success.index === index && success.success === true) ? 'Done' : 'Book'}
                    </button>
                ) : (
                    <button className="px-2 py-1 rounded bg-red-500 text-white w-20 text-center cursor-not-allowed">Booked</button>
                )}
            </div>
        ));
    };



    return (
        <>
        <div className="flex justify-center bg-gray-100 min-h-screen">
            <div className="flex flex-col items-start w-3/4 p-8 bg-white shadow-lg rounded-lg">
                {doctor && (<div className="flex items-center justify-between w-full mb-8">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold mb-2 text-gray-800">{doctor.name}</h1>
                        <p className="text-lg text-gray-600 mb-2">{doctor.specialization}</p>
                        <p className="text-lg text-gray-600 mb-2">{doctor.expertise}</p>
                        <p className="text-lg text-gray-600 mb-2">{doctor.experience} years of experience</p>
                        <p className="text-lg text-gray-600 mb-2">Average rating: {doctor.averageRating}</p>
                        <p className="text-lg text-gray-600 mb-2">Fee: ${doctor.price}</p>
                    </div>
                    <div className="w-32 h-32 overflow-hidden rounded-full">
                        <img src={"https://www.shutterstock.com/image-vector/vector-medical-icon-doctor-image-600nw-1170228883.jpg"} alt="Profile" className="object-cover w-full h-full rounded-full" />
                    </div>
                </div>)}
                <div className="mb-8 mx-auto">
                    <p className="text-lg text-gray-600 mb-2 ">Date: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="w-full">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Available Slots</h2>
                    {renderSlots()}
                </div>
            </div>
        </div>
        {order && <Rajorpay order={order} />} 
        </>
        
    );
}

export default DoctorDetails;