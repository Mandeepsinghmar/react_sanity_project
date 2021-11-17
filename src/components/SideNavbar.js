import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { MdRecentActors } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';

const SideNavbar = () => {
  return (
    <div className='pl-10 border-r-2 border-#F7F6F7  '>
      <Link to='/' className='flex gap-2 mb-10 pt-10 items-center'>
        <button className='bg-red-500 text-white rounded-full p-1 w-8 h-8 font-bold'>
          S
        </button>
        <h2 className='font-extrabold text-xl '>ShareMe</h2>
      </Link>
      <div className='flex flex-col justify-between items-start h-800 '>
        <div className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className='flex items-center gap-3 active:bg-black-800 '
          >
            <AiFillHome />
            Home
          </NavLink>
          <NavLink
            to='post-detail'
            className='flex items-center gap-3'
            activeClassName='bg-black font-bold text-2xl'
          >
            <MdRecentActors />
            Recent
          </NavLink>
        </div>
        <div className='flex gap-2 mr-2 p-2 items-center bg-white rounded-lg '>
          <img
            src='https://i.pinimg.com/236x/6f/d8/e0/6fd8e04bc9620686b6527b70a32b79e7.jpg'
            className='w-10 h-10 rounded-full'
            alt='user-profile'
          />
          <p>Mandeep singhmar</p>
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
