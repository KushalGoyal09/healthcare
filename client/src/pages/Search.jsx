import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
const backendBaseUrl = 'http://localhost:3000';

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [sortBy, setSortBy] = useState('averageRating');
  const [sortOrder, setSortOrder] = useState('asc');
  const [results, setResults] = useState([]);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchDoctors();
  }

  const searchDoctors = async () => {
    if(search === '') {
      setResults([]);
    }
    const dataToSummit = {
      search: search,
      searchBy: searchType,
      sortBy: sortBy,
      sortOrder: sortOrder
    }
    try {
      const { data } = await axios.post(`${backendBaseUrl}/api/search`, dataToSummit, {
        headers: {
          authorization: localStorage.getItem('auth0_id')
        }
      });
      setResults(data.doctors)
    } catch (error) {
      console.log('Error searching doctors:', error);
    }
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex items-center mb-6">
        <select
          className="appearance-none border rounded-l-md py-2 px-4 bg-white text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent mr-2"
          value={searchType}
          onChange={handleSearchTypeChange}
        >
          <option value="all">All</option>
          <option value="name">Name</option>
          <option value="specialization">Specialization</option>
          <option value="expertise">Expertise</option>
        </select>
        <input
          type="text"
          placeholder="Search Doctors"
          className="appearance-none border rounded-md py-2 px-4 bg-white text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent flex-1 mr-2"
          onChange={handleSearch}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          onClick={searchDoctors}
        >
          Search
        </button>
      </div>
      <div className="flex items-center mb-6">
        <button
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-l-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white mr-2"
          onClick={toggleSortOrder}
        >
          <FontAwesomeIcon icon={faSort} style={{ transform: `rotate(${sortOrder === 'asc' ? '0deg' : '180deg'})`, transition: 'transform 0.3s ease' }} />
        </button>
        <select
          className="appearance-none border rounded-r-md py-2 px-4 bg-white text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ml-2"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value="averageRating">Average Rating</option>
          <option value="price">Price</option>
          <option value="experience">Experience</option>
        </select>
      </div>
      {results.map((doctor, index) => (
        <DoctorCard
          key={index}
          id={doctor._id}
          name={doctor.name}
          expertise={doctor.expertise}
          specialization={doctor.specialization}
          experience={doctor.experience}
          averageRating={doctor.averageRating}
          price={doctor.price}
        />
      ))}
    </div>
  );
};

export default SearchPage