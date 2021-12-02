import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiHomeFill } from 'react-icons/ri';
import { BiLogInCircle } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';

const SideNavbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="pl-10 border-r-2 border-#F7F6F7  ">
      <Link to={user ? '/' : '/login'} className="flex gap-2 mb-10 pt-10 items-center">
        <button type="button" className="bg-red-500 text-white rounded-full p-1 w-8 h-8 font-bold">
          S
        </button>
        <h2 className="font-extrabold text-xl ">ShareMe</h2>
      </Link>
      <div className="flex flex-col justify-between items-start h-800 ">
        <div className="flex flex-col gap-5">
          {/* TODO: Remove code duplication - flex items-center gap-3 font-extrabold  text-gray-500 */}
          {user ? (
            <>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'flex items-center gap-3 font-extrabold ' : 'flex items-center gap-3 text-gray-500')}>
                <RiHomeFill />
                Home
              </NavLink>
              <NavLink to="/recent" className={({ isActive }) => (isActive ? 'flex items-center gap-3 font-black' : 'flex items-center gap-3 text-gray-500 ')}>
                <AiFillClockCircle />
                Recent
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'flex items-center gap-3 font-extrabold ' : 'flex items-center gap-3 text-gray-500')}>
              <BiLogInCircle />
              Login
            </NavLink>
          )}
        </div>
        {user && (
          <Link to={`user-profile/${user?.googleId}`} className="flex gap-2 mr-2 p-2 items-center bg-white rounded-lg ">
            <img src={user?.imageUrl} className="w-10 h-10 rounded-full" alt="user-profile" />
            <p>{user?.name}</p>
            <IoIosArrowForward />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
