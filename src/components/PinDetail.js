import React from 'react';
import { FiShare } from 'react-icons/fi';
import Feed from './Feed';

const PinDetail = () => {
  return (
    <div>
      <div
        className='flex xl:flex-row  flex-col m-auto bg-white gap-8 pb-3 '
        style={{ maxWidth: '1016px', borderRadius: '32px' }}
      >
        <div>
          <img
            className='rounded-t-3xl rounded-b-lg sm:w-508 w-96 sm:h-685 h-370'
            src='https://i.pinimg.com/236x/49/ff/bc/49ffbc7d478e9af9165ada48c4cc760f.jpg'
            alt='user-post'
          />
        </div>
        <div className='w-96 pt-10 pl-5 pr-4'>
          <div className='flex items-center justify-between'>
            <button className='bg-white font-bold text-2xl'>
              <FiShare />
            </button>
            <button className='bg-red-600  text-white p-2 rounded-full w-16  flex items-center justify-center '>
              Save
            </button>
          </div>
          <div>
            <h1 className='text-4xl font-bold break-words mt-3'>
              Work for God Shirt Bible Verse Christian Biblical Tshirt Tee |
              Etsy
            </h1>
            <p className='mt-3'>
              All shirts are made to order, each shirt is made with high quality
              vinyl and professionally pressed. All shirts are UNISEX. Contact
              me if you have questions about sizing. Placement of design may…
            </p>
          </div>
          <div className='flex gap-2 mt-5 items-center bg-white rounded-lg '>
            <img
              src='https://i.pinimg.com/236x/6f/d8/e0/6fd8e04bc9620686b6527b70a32b79e7.jpg'
              className='w-10 h-10 rounded-full'
              alt='user-profile'
            />
            <p className='font-bold'>Mandeep singhmar</p>
          </div>
          <h2 className='mt-5 text-2xl'>Comments</h2>
          <div>
            <div className='flex gap-2 mt-5 items-center bg-white rounded-lg '>
              <img
                src='https://i.pinimg.com/236x/6f/d8/e0/6fd8e04bc9620686b6527b70a32b79e7.jpg'
                className='w-10 h-10 rounded-full'
                alt='user-profile'
              />
              <div className='flex flex-col'>
                <p className='font-bold'>Mandeep singhmar</p>
                <p>comment</p>
              </div>
            </div>
          </div>

          <div className='flex mt-6 gap-3'>
            <img
              src='https://i.pinimg.com/236x/6f/d8/e0/6fd8e04bc9620686b6527b70a32b79e7.jpg'
              className='w-10 h-10 rounded-full'
              alt='user-profile'
            />
            <input
              className='border-gray-100 outline-none border-2 p-2 rounded-2xl w-72'
              type='text'
              placeholder='Add a comment'
            />
          </div>
        </div>
      </div>

      <h2 className='text-center font-bold text-2xl mt-8 mb-4'>
        More like this
      </h2>

      <Feed />
    </div>
  );
};

export default PinDetail;
