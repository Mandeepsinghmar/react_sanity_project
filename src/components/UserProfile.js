import React from 'react';
import { FiShare } from 'react-icons/fi';
import Feed from './Feed';

const UserProfile = () => {
  return (
    <div>
      <div className='lg:w-656 m-auto'>
        <div>
          <img
            className='rounded-lg lg:w-656 h-370 m-auto '
            src='https://i.pinimg.com/236x/6f/d8/e0/6fd8e04bc9620686b6527b70a32b79e7.jpg'
            alt='user-post'
          />
          <img
            className='rounded-full w-28 h-28 m-auto -mt-14 '
            src='https://i.pinimg.com/236x/6f/d8/e0/6fd8e04bc9620686b6527b70a32b79e7.jpg'
            alt='user-post'
          />
        </div>
        <div className='text-center mt-3'>
          <h1 className='font-bold text-3xl'>Mandeep Singhmar</h1>
          <p className='mt-2'>@mandeepsinghmar</p>
        </div>
        <div className='flex items-center justify-center gap-4 mt-5 mb-4'>
          <button className='text-2xl p-2 rounded-full w-10 h-10 font-extrabold flex items-center justify-center text-dark opacity-75 hover:opacity-100'>
            <FiShare />
          </button>
          <button className='bg-red-500 text-white font-bold p-2 rounded-full w-16 '>
            Follow
          </button>
        </div>
        <div className='text-center mb-5'>
          <button className='bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 '>
            Created
          </button>
          <button className='bg-red-500 text-white font-bold p-2 rounded-full w-20 '>
            Saved
          </button>
        </div>
      </div>
      <Feed />
    </div>
  );
};

export default UserProfile;
