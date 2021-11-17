import React, { useState, useEffect } from 'react';

import { client } from '../client';
import Pin from './Pin';

const Feed = () => {
  const [pins, setPins] = useState();
  const query = '*[_type == "pin"]';
  // const url = `https://60slbd68.api.sanity.io/v1/data/query/production?query=${query}`;

  useEffect(() => {
    // const fetchData = async () => {

    //   const res = await fetch(url);
    //   const data = await res.json();
    //   console.log(data);
    // };
    // fetchData();

    client.fetch(query).then((data) => {
      setPins(data);
    });
  }, []);
  console.log(pins);

  return (
    <div
      className='flex flex-wrap gap-4 justify-center'
      style={{ counterReset: 'items', flexBasis: '100%' }}
    >
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </div>
  );
};

export default Feed;
