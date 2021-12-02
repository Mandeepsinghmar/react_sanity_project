import React, { useState, useEffect } from 'react';

import { client } from '../client';
import { recentQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';

const Recent = () => {
  const [pins, setPins] = useState();

  useEffect(() => {
    client.fetch(recentQuery).then((data) => {
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
