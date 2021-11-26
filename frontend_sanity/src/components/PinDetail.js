import React, { useEffect, useState } from 'react';
import { IoIosShareAlt } from 'react-icons/io';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import Share from './Share';

const PinDetail = function () {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addingComment, setAddingComment] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchPinDetails = () => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
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
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
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
          image{
            asset->{
              url
            }
          },
          _id,
          destination,
          postedBy->{
            _id,
            userName,
            image
          },
          save[]{
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          },
        }`;

        client.fetch(query1).then((res) => {
          setPins(res);
        });
      }
    });
  };

  console.log(pinDetail);

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment !== '') {
      setAddingComment(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{
          comment,
          _key: uuidv4(),
          postedBy: {
            _type: 'postedBy',
            _ref: user.googleId,
          },
        }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
          console.log('comment saved');
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
        <Share
          url={`pin-detail/${pinId}`}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          title="Pin"
        />
      </div>
      )}
      {pinDetail && (
        <div
          className="flex xl:flex-row flex-col m-auto bg-white gap-8 pb-3 "
          style={{ maxWidth: '1016px', borderRadius: '32px' }}
        >
          <div className="flex justify-center items-center">
            <img
              className="rounded-t-3xl rounded-b-lg sm:w-508 w-350 sm:h-685 h-370"
              src={
                (pinDetail?.image && urlFor(pinDetail?.image).width(250).url())
              }
              alt="user-post"
            />

          </div>
          <div className="w-96 lg:pt-5 pl-5 pr-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  className="bg-secondaryColor p-2 rounded-full text-xl flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                  onClick={() => setModalIsOpen(true)}
                >
                  <IoIosShareAlt />
                </button>
                <a
                  href={`${pinDetail.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"

                ><MdDownloadForOffline />
                </a>
              </div>
              <a href={pinDetail.destination} target="_blank" rel="noreferrer">
                {pinDetail.destination?.slice(8)}
              </a>
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
            <div className="max-h-370 overflow-y-auto">
              {pinDetail?.comments?.map((item) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
                  {/* <Link to={`/user-profile/${item?.postedBy?._id}`}> */}
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full"
                    alt="user-profile"
                  />
                  {/* </Link> */}
                  <div className="flex flex-col">
                    {/* <Link to={`/user-profile/${item?.postedBy?._id}`}> */}
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    {/* </Link> */}
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex mt-6 gap-3">
              <img
                src={user.imageUrl}
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
                className="bg-red-500 text-white rounded-full p-2 pl-3 pr-3 font-semibold"
                onClick={addComment}
              >
                {addingComment ? 'Doing...' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
      {
            pins?.length > 0 && (
              <h2 className="text-center font-bold text-2xl mt-8 mb-4">
                More like this
              </h2>
            )
          }
      {pins ? (

        <MasonryLayout pins={pins} />
      ) : (
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
