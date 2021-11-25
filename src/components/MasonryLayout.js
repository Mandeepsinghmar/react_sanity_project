import React from 'react';
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
        { pins?.map((pin) => (
          <Pin key={pin._id} pin={pin} className="grid-item" />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryLayout;
