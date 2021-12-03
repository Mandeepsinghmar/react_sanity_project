import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const TopNavbar = ({ setSearchTerm, searchTerm }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    return (
      <div className="flex gap-5 w-full sm:pt-10 pb-5 ">
        <div className=" flex justify-start items-center w-full px-2 rounded-md bg-secondaryColor outline-none">
          <IoMdSearch fontSize={21} />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="ml-1 p-2 w-full bg-secondaryColor outline-none"
          />

        </div>
        <div className="flex gap-3 mr-1 ">
          <Link to={`user-profile/${user?.googleId}`}>
            <img src={user.imageUrl} alt="user-pic" className="w-14 h-12 rounded-lg " />
          </Link>
          <Link to="/create-pin" className="bg-black text-white rounded-lg w-14 h-12 flex justify-center items-center">
            <IoMdAdd />
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default TopNavbar;
