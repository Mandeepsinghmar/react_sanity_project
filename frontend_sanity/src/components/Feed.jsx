import React, { useState, useEffect } from 'react';

import { client } from '../client';
import { feedQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [pins, setPins] = useState();
  useEffect(() => {
    client.fetch(feedQuery).then((data) => setPins(data));
  }, []);

  return (
    <div>
      {pins?.length > 0 ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="We are adding new ideas to your feed!" />
      )}
    </div>
  );
};

export default Feed;
