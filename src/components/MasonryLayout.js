import React from 'react';
import Loader from 'react-loader-spinner';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import Pin from './Pin';

const MasonryLayout = function ({ pins }) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        750: 2,
        900: 3,
        1250: 4,
        1400: 5,
        1500: 6,
      }}
    >
      <Masonry>
        {pins ? pins.map((pin) => (
          <Pin key={pin._id} pin={pin} className="grid-item" />
        )) : (
          <div className="flex flex-col justify-center items-center w-full">
            <Loader
              type="Circles"
              color="#00BFFF"
              height={50}
              width={200}
              className="m-5"
            />
          </div>
        )}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryLayout;
