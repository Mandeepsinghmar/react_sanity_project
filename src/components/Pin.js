import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMoreHoriz } from 'react-icons/md';
import { FiShare } from 'react-icons/fi';
import { urlFor } from '../client';

const Pin = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const { about, pinImage } = pin;
  return (
    <div>
      <Link to='/post-detail'>
        <div
          onMouseEnter={() => setPostHovered(true)}
          onMouseLeave={() => setPostHovered(false)}
          className=' relative cursor-zoom-in w-full bg-dark hover:opacity-90 hover:inset-0'
        >
          <img
            className='rounded-lg w-60'
            src={
              (pinImage && urlFor(pinImage).width(250).url()) ||
              'https://i.pinimg.com/236x/6f/d8/e0/6fd8e04bc9620686b6527b70a32b79e7.jpg'
            }
            alt='user-post'
          />
          <p>{about}</p>
          {postHovered && (
            <div
              className='absolute top-0 w-full h-full flex flex-col justify-between p-3'
              style={{ height: '100%' }}
            >
              <div className='flex items-center justify-between'>
                <button className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100'>
                  <FiShare />
                </button>
                <button className='bg-red-500 text-white font-bold p-2 rounded-full w-16 '>
                  Save
                </button>
              </div>
              <div className=' flex justify-end gap-3 w-full'>
                <button className='bg-white rounded-full p-2 w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100'>
                  <FiShare />
                </button>
                <button className='bg-white rounded-full p-2 w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100'>
                  <MdMoreHoriz />
                </button>
              </div>
            </div>
          )}
        </div>
      </Link>

      <Link to='/user-profile' className='flex gap-2 mt-2'>
        <img
          className='w-8 h-8 rounded-full'
          src='https://i.pinimg.com/236x/6f/d8/e0/6fd8e04bc9620686b6527b70a32b79e7.jpg'
          alt='user-profile'
        />
        <p className='font-bold'>Mandeep singhmar</p>
      </Link>
    </div>
  );
};

export default Pin;
