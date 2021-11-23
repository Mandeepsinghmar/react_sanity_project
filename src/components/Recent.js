import React, { useState, useEffect } from 'react';

import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Recent = function () {
  const [pins, setPins] = useState();
  const date = new Date();
  useEffect(() => {
    const query = `*[_type == "pin" ]{
          pinImage,
          _id,
          _createdAt,
          destination,
          postedBy->{
            _id,
            userName,
            image
          },
        }`;

    client.fetch(query).then((data) => {
      setPins(data);
    });
  }, []);
  if (!pins) {
    return <Spinner />;
  }
  return (
    <div>
      <MasonryLayout pins={pins} />
    </div>
  );
};

export default Recent;
