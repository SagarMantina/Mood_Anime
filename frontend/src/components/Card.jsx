import React from 'react';

const Card = ({ data }) => {
  return (
    <div className='bg-gray-800 rounded-lg shadow-lg p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer w-60 '>
      <img src={data.images.jpg.image_url} alt={data.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <p className='text-sm font-bold text-white'>{data.title}</p>
    </div>
  );
};

export default Card;
