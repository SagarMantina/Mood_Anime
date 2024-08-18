import React from 'react';

const Part = ({ anime }) => {
  return (
    <div className='bg-gray-800 rounded-lg shadow-lg p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer w-full sm:w-60'>
      {anime.image ? (
        <img className="w-full h-40 sm:h-56 object-cover rounded-lg mb-4" src={anime.image} alt={anime.title} />
      ) : (
        <div className="w-full h-40 sm:h-56 bg-gray-700 text-center text-white flex items-center justify-center rounded-lg mb-4">
          No Image Available
        </div>
      )}
      <p className='text-sm font-bold text-white'>{anime.name}</p>
      <p className='text-sm font-bold text-white'>Rating: {anime.score}</p>
    </div>
  );
};

export default Part;
