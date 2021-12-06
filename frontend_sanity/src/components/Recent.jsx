import React, { useState, useEffect } from 'react';

import { client } from '../client';
import { recentQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spineer from './Spinner';

const Recent = () => {
  const [pins, setPins] = useState();

  useEffect(() => {
    client.fetch(recentQuery).then((data) => {
      setPins(data);
    });
  }, []);

  return (
    <div>
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spineer message="Showing recent pins" />
      )}
    </div>
  );
};

export default Recent;
