import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
      <p className="text-lg mb-8">Sorry, the page you&apos;re looking for does not exist.</p>
      <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
        Return to Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;