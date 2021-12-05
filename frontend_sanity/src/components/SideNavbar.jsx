import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiHomeFill } from 'react-icons/ri';
import { BiLogInCircle } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 transition-all duration-200 ease-in-out';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out ';

const SideNavbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="flex flex-col justify-between bg-white h-screen min-w-210">
      <div className="flex flex-col">
        <Link to={user ? '/' : '/login'} className="flex px-5 gap-2 mb-10 pt-10 items-center">
          <button type="button" className="bg-red-500 text-white rounded-full p-1 w-8 h-8 font-bold">
            S
          </button>
          <h2 className="font-extrabold text-xl ">ShareMe</h2>
        </Link>
        <div className="flex flex-col gap-5">
          {user ? (
            <>
              <NavLink to="/" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                <RiHomeFill />
                Home
              </NavLink>
              <NavLink to="/recent" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                <AiFillClockCircle />
                Recent
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
              <BiLogInCircle />
              Login
            </NavLink>
          )}
        </div>
      </div>

      {user && (
      <Link to={`user-profile/${user?.googleId}`} className="flex mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3 ">
        <img src={user?.imageUrl} className="w-10 h-10 rounded-full" alt="user-profile" />
        <p>{user?.name}</p>
        <IoIosArrowForward />
      </Link>
      )}

    </div>
  );
};

export default SideNavbar;
