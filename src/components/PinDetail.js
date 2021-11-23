import React, { useEffect, useState } from 'react';
import { FiShare } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Share from './Share';

const PinDetail = function () {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState();
  const user = JSON.parse(localStorage.getItem('user'));
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchPinDetails = () => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
      pinImage,
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      comments[]{
        comment,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
    client.fetch(query).then((data) => {
      setPinDetail(data[0]);

      if (data[0]) {
        const query1 = `*[_type == "pin" && category == '${data[0].category}' && _id != '${data[0]._id}' ]{
          pinImage,
          _id,
          destination,
          postedBy->{
            _id,
            userName,
            image
          },
        }`;

        client.fetch(query1).then((res) => {
          setPins(res);
        });
      }
    });
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment !== '') {
      const doc = {
        comments: [
          ...pinDetail.comments,
          {
            // _key: 'dff',
            comment,
            postedBy: {
              _type: 'postedBy',
              _ref: user.googleId,
            },
          },
        ],
      };
      client
        .patch(pinDetail._id)
        .set(doc)
        .commit()
        .then(() => {
          fetchPinDetails();
        });
    }
  };
  if (!pinDetail) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <Loader
          type="Circles"
          color="#00BFFF"
          height={50}
          width={200}
          className="m-5"
        />
      </div>
    );
  }
  return (
    <div>
      {modalIsOpen && (
      <div>
        <p className="text-xl font-semibold mb-2">Send this Pin</p>
        <Share
          url={`pin-detail/${pinId}`}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </div>
      )}
      {pinDetail && (
        <div
          className="flex xl:flex-row  flex-col m-auto bg-white gap-8 pb-3 "
          style={{ maxWidth: '1016px', borderRadius: '32px' }}
        >
          <div>
            <img
              className="rounded-t-3xl rounded-b-lg sm:w-508 w-96 sm:h-685 h-370"
              src={pinDetail.pinImage}
              alt="user-post"
            />
          </div>
          <div className="w-96 pt-10 pl-5 pr-4">
            <div className="flex items-center justify-between">
              <button type="button" className="bg-white font-bold text-2xl" onClick={() => setModalIsOpen(true)}>
                <FiShare />
              </button>
              <button type="button" className="bg-red-600  text-white p-2 rounded-full w-16  flex items-center justify-center ">
                Save
              </button>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetail.title}
              </h1>
              <p className="mt-3">{pinDetail.about}</p>
            </div>
            <Link
              to={`/user-profile/${pinDetail?.postedBy._id}`}
              className="flex gap-2 mt-5 items-center bg-white rounded-lg "
            >
              <img
                src={pinDetail?.postedBy.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{pinDetail?.postedBy.userName}</p>
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="h-370 overflow-y-scroll">
              {pinDetail?.comments?.map((item) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex mt-6 gap-3">
              <img
                src="https://i.pinimg.com/236x/6f/d8/e0/6fd8e04bc9620686b6527b70a32b79e7.jpg"
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <input
                className="border-gray-100 outline-none border-2 p-2 rounded-2xl w-72"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                disabled={comment === ''}
                className="bg-red-600 text-white rounded-full p-2 pl-3 pr-3 font-semibold"
                onClick={addComment}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-center font-bold text-2xl mt-8 mb-4">
        More like this
      </h2>
      {pins ? <MasonryLayout pins={pins} /> : (
        <div className="flex flex-col justify-center items-center w-full">
          <Loader
            type="Circles"
            color="#00BFFF"
            height={50}
            width={200}
            className="m-5"
          />
        </div>
      )}
    </div>
  );
};

export default PinDetail;
