import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { basename } from 'path';
import { createReadStream } from 'fs';

import { client } from '../client';

const CreatePin = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState(false);
  const [image, setImage] = useState();

  const uploadImage = (e) => {
    let selectedFile = e.target.files[0];

    console.log(e.target.files[0]);

    client.assets
      .upload('image', createReadStream(selectedFile))
      .then((imageAsset) => {
        // const imageObject = {
        //   _type: 'image',
        //   asset: {
        //     _type: 'reference',
        //     _ref: imageAsset._id,
        //   },
        // };
        // setImage(imageObject);
        console.log(imageAsset);
      });
  };
  const savePin = () => {
    if (title !== '' && about !== '' && destination !== '') {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        pinImage: image,
      };
      client.create(doc).then((res) => {
        console.log(`new pin created ${res._id}`);
      });
    } else {
      setFields(true);
    }
  };
  
  return (
    <div className='h-90vh flex justify-center items-center mt-10 sm:-mt-20'>
      <div className=' flex flex-wrap justify-center items-center bg-white sm:p-10 p-2'>
        <div className='bg-primary p-3 w-340'>
          <div className=' border-2 border-dotted border-gray-300 p-3'>
            {/* {image ? (
              <img src={image} />
            ) : ( */}
            <label>
              <div className='flex flex-col mt-40 items-center justify-center'>
                <div className='flex flex-col justify-center items-center'>
                  <p className='font-bold text-2xl'>
                    <AiOutlineCloudUpload />
                  </p>
                  <p className='text-lg'>Click to upload</p>
                </div>

                <p className='mt-32 text-gray-400'>
                  Recommendation: Use high-quality .jpg less than 20MB
                </p>
              </div>
              <input
                type='file'
                name='upload-image'
                onChange={uploadImage}
                className='w-0 h-0'
              />
            </label>
            {/* )} */}
          </div>
        </div>
        <div className='flex flex-col gap-6 pl-10 mt-5'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add your title'
            className='outline-none text-3xl font-bold border-b-2 border-gray-200 p-2'
          />
          <div className='flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg '>
            <img
              src='https://i.pinimg.com/236x/6f/d8/e0/6fd8e04bc9620686b6527b70a32b79e7.jpg'
              className='w-10 h-10 rounded-full'
              alt='user-profile'
            />
            <p className='font-bold'>Mandeep singhmar</p>
          </div>
          <input
            type='text'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='Tell everyone what your Pin is about'
            className='outline-none text-lg border-b-2 border-gray-200 p-2'
          />
          <input
            type='url'
            vlaue={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder='Add a destination link'
            className='outline-none text-lg border-b-2 border-gray-200 p-2'
          />
          {fields && (
            <p className='text-red-500 text-xl'>Please add all fields.</p>
          )}
          <button
            onClick={savePin}
            className='bg-red-500 text-white font-bold p-2 rounded-full w-16 '
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
