import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Loader from 'react-loader-spinner';
// import { createReadStream } from 'fs';

import { categories } from '../utils/data';
import { client } from '../client';

const CreatePin = function () {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [savingPin, setSavingPin] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];

    // uploading asset using cloudinary

    if (selectedFile) {
      setLoading(true);
    }

    if (imageUrl) {
      setLoading(false);
    }

    const data = new FormData();
    data.append('file', selectedFile);
    data.append('upload_preset', 'social-media-app');
    data.append('cloud_name', 'detpurfls');
    if (selectedFile) {
      fetch('https://api.cloudinary.com/v1_1/detpurfls/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          setImageUrl(result.url);
        });
    }

    // uploading asset to sanity

    // client.assets
    //   .upload('image', createReadStream(data), {
    //     filename: 'myImage.jpg',
    //   })
    //   .then((document) => {
    //     console.log('The image was uploaded!', document);
    //   })
    //   .catch((error) => {
    //     console.error('Upload failed:', error.message);
    //   });
  };

  const savePin = () => {
    if (
      title !== ''
      && about !== ''
      && destination !== ''
      && imageUrl !== ''
      && category !== ''
    ) {
      setSavingPin(true);

      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        pinImage: imageUrl,
        userId: user.googleId,
        postedBy: {
          _type: 'postedBy',
          _ref: user.googleId,
        },
        category,
      };
      client.create(doc).then(() => {
        setSavingPin(false);
        navigate('/');
      });
    } else {
      setFields(true);
    }
  };
  return (
    <div className=" flex justify-center items-center mt-10 lg:mt-20">
      <div className=" flex flex-wrap justify-center items-center bg-white sm:p-10 p-2">
        <div className="bg-secondaryColor p-3 w-340">
          <div className=" border-2 border-dotted border-gray-300 p-3">
            {loading && (
              <Loader
                type="Circles"
                color="#00BFFF"
                height={50}
                width={200}
                className="m-5"
              />
            )}
            {!imageUrl ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex flex-col mt-40 items-center justify-center">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="mt-32 text-gray-400">
                    Recommendation: Use high-quality .jpg less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="uploaded-pic"
                  className="h-510 w-300"
                />
                <button
                  type="button"
                  className="absolute top-60 p-3 rounded-full bg-white text-xl cursor-pointer "
                  onClick={() => setImageUrl(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:pl-10 mt-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="outline-none text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
            <img
              src={user.imageUrl}
              className="w-10 h-10 rounded-full"
              alt="user-profile"
            />
            <p className="font-bold">{user.name}</p>
          </div>
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Pin is about"
            className="outline-none text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="url"
            vlaue={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link - https://hello.com"
            className="outline-none text-lg border-b-2 border-gray-200 p-2"
          />
          {fields && (
            <p className="text-red-500 text-xl">Please add all fields.</p>
          )}
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-2 font-semibold text-xl">Choose Pin Category</p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {categories.map((item) => (
                  <option className="p-2 text-lg" value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={savePin}
              className="bg-red-500 text-white font-bold p-2 rounded-full w-28 "
            >
              {savingPin ? 'Saving Pin...' : 'Save Pin'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
