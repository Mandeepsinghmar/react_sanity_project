import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [pins, setPins] = useState();
  const { categoryId } = useParams();
  console.log(categoryId);
  useEffect(() => {
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => setPins(data));
    } else {
      client.fetch(feedQuery).then((data) => setPins(data));
    }
  }, [categoryId]);

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
