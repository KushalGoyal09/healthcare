import React, { useState } from 'react';

const DoctorRatingPopup = ({ doctorName, onSubmit }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(doctorName, rating);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-75 p-4 md:inset-0 md:flex md:items-center md:justify-center">
      <div className="bg-white rounded-lg shadow-md md:max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h5 className="text-xl font-medium text-gray-800">Rate Dr. {doctorName}</h5>
          <button type="button" className="text-gray-400 focus:outline-none" onClick={() => setRating(0)}>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.707 3.307a1 1 0 00-1.414 0L0 6.014l4.293 4.293a1 1 0 001.414-1.414L2.307 7.707l2.4-2.4zM10 3.307a1 1 0 00-1.414 0L6.707 7.707l2.4 2.4a1 1 0 001.414-1.414L11.693 6.014l-4.293-4.293zM15.293 3.307a1 1 0 00-1.414 0L13.586 6.014l2.4 2.4a1 1 0 001.414-1.414L17.693 7.707l-2.4-2.4z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center items-center px-4 py-2">
          {[1, 2, 3, 4, 5].map((starNum) => (
            <span
              key={starNum}
              className={`cursor-pointer text-xl text-yellow-500 ${
                starNum <= rating ? '' : 'opacity-50'
              }`}
              onClick={() => handleStarClick(starNum)}
            >
              ★
            </span>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            disabled={!rating} // Disable submit button if no rating is selected
          >
            Submit Rating
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRatingPopup;
