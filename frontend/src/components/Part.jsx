import React from 'react';

const Part = ({ anime }) => {
  return (
   
    <div className='bg-gray-800 rounded-lg shadow-lg p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer w-60 '> 
       {anime.image ? (
  <img src={anime.image} alt={anime.title} />
) : (
  <div className="no-image">No Image Available</div>
)}
  <p className='text-sm font-bold text-white '>{anime.name}</p>
   <p className='text-sm font-bold text-white'>Rating: {anime.score}</p> 
    </div>
  );
};

export default Part;
