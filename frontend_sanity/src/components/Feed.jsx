import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import { client } from '../client';
import { feedQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';

const Feed = () => {
  const [pins, setPins] = useState();
  useEffect(() => {
    client.fetch(feedQuery).then((data) => setPins(data));
  }, []);

  if (!pins) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <Loader type="Circles" color="#00BFFF" height={50} width={200} className="m-5" />
        <p className="font-bold text-2xl text-center p-2">We are adding new ideas to your feed!</p>
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
