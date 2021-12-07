import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../assets/logo.svg';
import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';

const SideNavbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="flex flex-col justify-between bg-white h-screen min-w-210">
      <div className="flex flex-col">
        <Link to={user ? '/' : '/login'} className="flex px-5 gap-2 mb-6 pt-1 w-190 h-80 items-center">
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">

          <NavLink to="/" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="ml-4 text-xl">Discover cateogries</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink to={`/category/${category.name}`} className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
              {/* <IoIosArrowForward /> */}
              <img src={category.image} className="w-8 h-8 rounded" />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link to={`user-profile/${user?.googleId}`} className="flex mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3">
          <img src={user?.imageUrl} className="w-10 h-10 rounded-full" alt="user-profile" />
          <p>{user?.name}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default SideNavbar;
