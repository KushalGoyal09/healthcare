import React from 'react';

const DoctorCard = ({ id, name, expertise, specialization, experience, averageRating, price }) => {
    return (
        <div
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-2xl transition duration-300 ease-in-out mb-3 mt-3"
            onClick={() => {
                window.location.href = `/doctor/${id}`;
            }}
        >
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base mb-2">{expertise}</p>
                <p className="text-gray-700 text-base mb-2">{specialization}</p>
                <p className="text-gray-700 text-base mb-2">Experience: {experience} years</p>
                <p className="text-gray-700 text-base mb-2">Average Rating: {averageRating}</p>
                <p className="text-gray-700 text-base mb-2">Price: ${price}</p>
            </div>
        </div>
    );
};

export default DoctorCard;
