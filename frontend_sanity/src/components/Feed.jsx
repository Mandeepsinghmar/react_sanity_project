import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import { client } from '../client';
import MasonryLayout from './MasonryLayout';

const Feed = () => {
  const [pins, setPins] = useState();

  //  TODO: pull these queries from the utils file, they clutter the function component view
  useEffect(() => {
    const query = `*[_type == "pin"] | order(_createdAt desc) {
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
        } `;

    client.fetch(query).then((data) => setPins(data));
  }, []);

  if (!pins) {
    return (
      <div className="flex flex-col justify-center items-center w-full m-5">
        <Loader type="Circles" color="#00BFFF" height={50} width={200} className="m-5" />
        <p className="font-bold text-2xl">We're adding new ideas to your feed!</p>
      </div>
    );
  }

  return (
    <div>
      <MasonryLayout pins={pins} />
    </div>
  );
};

export default Feed;
