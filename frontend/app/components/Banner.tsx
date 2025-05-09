import React from 'react';

const Banner = () => {
  return (
    <div className="w-full bg-[#111]">
      <div className="max-w-[1400px] h-[276px] mx-auto px-12 flex flex-col justify-center">
        <h1 className="text-[40px] font-bold text-white mb-4">
          Shop Men's
        </h1>
        <p className="text-lg text-white max-w-[600px]">
          Revamp your style with the latest designer trends in men's clothing or achieve a perfectly curated wardrobe thanks to our line-up of timeless pieces.
        </p>
      </div>
    </div>
  );
};

export default Banner; 