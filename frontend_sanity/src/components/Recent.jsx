import React, { useState, useEffect } from 'react';

import { client } from '../client';
import MasonryLayout from './MasonryLayout';

const Recent = () => {
  const [pins, setPins] = useState();

  //  TODO: pull these queries from the utils file, they clutter the function component view
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
    });
  }, []);

  return (
    <div>
      <MasonryLayout pins={pins} />
    </div>
  );
};

export default Recent;
