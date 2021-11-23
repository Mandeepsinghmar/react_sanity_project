import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineFilterList } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

const TopNavbar = function ({ setSearchTerm, searchTerm }) {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  return (
    <div>
      {user && (
        <div>
          <Link
            to="/"
            className="flex sm:hidden gap-2 mb-4 mt-4 items-center justify-center"
          >
            <button type="button" className="bg-red-500 text-white rounded-full p-1 w-8 h-8 font-bold">
              S
            </button>
            <h2 className="font-extrabold text-xl ">ShareMe</h2>
          </Link>
          <div className="flex gap-5 w-full sm:pt-10 pb-5 ">
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              value={searchTerm}
              onFocus={() => navigate('/search')}
              className="w-full p-3 rounded bg-secondaryColor outline-none"
            />
            <div className="flex gap-3 mr-1 ">
              <Link
                to={`user-profile/${user?.googleId}`}
              >
                <img src={user.imageUrl} alt="user-pic" className="w-16 h-12 rounded-lg " />
              </Link>
              <Link
                to="/create-pin"
                className="p-4 bg-black text-white rounded-lg"
              >
                <IoMdAdd />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
