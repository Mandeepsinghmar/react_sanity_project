import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineFilterList } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

const TopNavbar = () => {
  return (
    <div>
      <Link to='/' className='flex sm:hidden gap-2 mb-4 mt-4 items-center justify-center'>
        <button className='bg-red-500 text-white rounded-full p-1 w-8 h-8 font-bold'>
          S
        </button>
        <h2 className='font-extrabold text-xl'>ShareMe</h2>
      </Link>
      <div className='flex gap-5 w-full sm:pt-10 pb-5 bg-primary'>
        <input
          type='text'
          placeholder='Search'
          className='w-full p-3 rounded bg-secondary outline-none'
        />
        <div className='flex gap-3'>
          <button className='p-3 bg-white rounded-lg'>
            <MdOutlineFilterList />{' '}
          </button>
          <Link to='/create-pin' className='p-3 bg-black text-white rounded-lg'>
            <IoMdAdd />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
