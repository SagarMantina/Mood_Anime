import React from 'react';



const Card = ({ data }) => {
  return (
    <div className='bg-gray-800 rounded-lg shadow-lg p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-2'>
      <img src={data.images.jpg.image_url} alt={data.title} className="w-full lg:h-56 object-cover rounded-lg mb-4 sm:h-28" />
      <p className='text-sm font-bold text-white'>{data.title}</p>
      <p className='text-sm text-gray-400'>Rating: {data.score}</p>
    </div>
  );
};

export default Card;
