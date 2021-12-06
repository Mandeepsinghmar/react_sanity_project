import React from 'react';
import Loader from 'react-loader-spinner';

function Spineer({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Loader
        type="Circles"
        color="#00BFFF"
        height={50}
        width={200}
        className="m-5"
      />

      <p className="text-lg ">{message}</p>
    </div>
  );
}

export default Spineer;
