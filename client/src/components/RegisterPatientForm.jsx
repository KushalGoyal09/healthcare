import React, { useState } from 'react';
import axios from 'axios';
const backendBaseUrl = 'http://localhost:3000';

const RegisterPatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    medicalDetails: ''
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const dataToSubmit = {
      auth0_id: localStorage.getItem('auth0_id'),
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      medicalDetails: formData.medicalDetails
    }
    try {
      const { data } = await axios.post(`${backendBaseUrl}/api/register/patient`, dataToSubmit);
      setMessage(data.message);
      localStorage.setItem('patient', data.patient._id);
    } catch (error) {
      setError("An error occured");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register Patient</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                     border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none 
                     focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="sr-only">Date of Birth</label>
              <input id="dateOfBirth" name="dateOfBirth" type="date" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                     border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
                     focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="medicalDetails" className="sr-only">Medical Details</label>
              <textarea id="medicalDetails" name="medicalDetails" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                        border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                        focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Medical Details" value={formData.medicalDetails} onChange={handleChange} />
            </div>
          </div>
          <div>
            <p className="text-red-500 text-xs italic">{error}</p>
            <p className="text-green-500 text-xs italic">{message}</p>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border 
            border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-indigo-500">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPatientForm;
