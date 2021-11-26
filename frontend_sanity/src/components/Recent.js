import React, { useState, useEffect } from 'react';

import { client } from '../client';
import MasonryLayout from './MasonryLayout';

const Recent = function () {
  const [pins, setPins] = useState();
  const date = new Date();
  useEffect(() => {
    const query = `*[_type == "pin"][0...10]{
      image{
        asset->{
          url
        }
      },
          _id,
          _createdAt,
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

    client.fetch(query).then((data) => {
      setPins(data);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <MasonryLayout pins={pins} />
    </div>
  );
};

export default Recent;
