import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FiShare } from 'react-icons/fi';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import Share from './Share';

const Pin = function ({ pin }) {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { postedBy, pinImage, _id, destination } = pin;
  return (
    <div className="m-2">
      {modalIsOpen && (
        <div>
          <p className="text-xl font-semibold mb-2">Send this Pin</p>
          <Share
            url={`pin-detail/${_id}`}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
        </div>
      )}
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative cursor-zoom-in w-full bg-dark hover:opacity-90 hover:inset-0"
      >
        <img
          className="rounded-lg w-60 "
          src={pinImage}
          // src={
          //   (pinImage && urlFor(pinImage).width(250).url()) ||
          //   'https://i.pinimg.com/236x/6f/d8/e0/6fd8e04bc9620686b6527b70a32b79e7.jpg'
          // }
          alt="user-post"
        />

        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-5 pt-2 pb-2 z-50"
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={(e) => {
                  setModalIsOpen(true);
                  e.stopPropagation();
                }}
                className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100"
              >
                <FiShare />
              </button>
              <button type="button" className="bg-red-500 text-white font-bold p-2 text-lg rounded-full w-16 ">
                Save
              </button>
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full"
                  rel="noreferrer"
                >
                  {' '}
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8)}{' '}
                </a>
              ) : undefined}

              {/* <div className='flex gap-2'>
                <button className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100'>
                  <FiShare />
                </button>
                <button className='bg-white rounded-full p-2 w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100'>
                  <MdMoreHoriz />
                </button>
              </div> */}
            </div>
          </div>
        )}
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2">
        <img
          className="w-8 h-8 rounded-full"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-bold">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
