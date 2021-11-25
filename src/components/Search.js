import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { categories } from '../utils/data';

const Search = function ({ searchTerm, setSearchTerm }) {
  const [pins, setPins] = useState();

  useEffect(() => {
    if (searchTerm !== '') {
      const query = `*[_type == "pin" && category == '${searchTerm}']{
            pinImage,
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
          }`;
      window.scrollTo(100, 100);
      client.fetch(query).then((data) => {
        setPins(data);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center gap-3 mb-10 ">
        {categories.map((category) => (
          <div
            className="relative cursor-pointer"
            onClick={() => setSearchTerm(category.name)}
          >
            <img
              src={category.image}
              alt="category"
              className="w-28 h-32 rounded-2xl object-cover"
            />
            <p className="text-white text-xl capitalize font-bold absolute bottom-2 left-2">
              {category.name}
            </p>
          </div>
        ))}
      </div>
      {pins?.length !== 0 ? (
        <MasonryLayout pins={pins} />
      ) : (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;