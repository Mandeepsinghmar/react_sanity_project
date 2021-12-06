import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { categories, searchQuery } from '../utils/data';
import Spineer from './Spinner';

const Search = ({ searchTerm, setSearchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
        {categories.map((category) => (
          <div className="relative cursor-pointer hover:shadow-md rounded-2xl transition-all duration-500 ease-in-out" onClick={() => setSearchTerm(category.name)}>
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
      {loading && <Spineer message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;
