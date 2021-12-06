import React, { useState, useEffect } from 'react';

import { client } from '../client';
import { feedQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spineer from './Spinner';

const Feed = () => {
  const [pins, setPins] = useState();
  useEffect(() => {
    client.fetch(feedQuery).then((data) => setPins(data));
  }, []);

  if (!pins) {
    return (
      <Spineer message="We are adding new ideas to your feed!" />
    );
  }

  return (
    <div>
      <MasonryLayout pins={pins} />
    </div>
  );
};

export default Feed;
