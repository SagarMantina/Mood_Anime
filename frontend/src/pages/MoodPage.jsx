import React from 'react';
import { useNavigate } from 'react-router-dom';

const MoodPage = () => {
  const moods = [
    "Romantic", "Thrilled", "Bored", "Curious", "Anxious", "Excited", 
    "Content", "Melancholy", "Angry", "Confused", "Joyful", "Creative", 
    "Relaxed", "Frustrated", "Hopeful", "Sad", "Disappointed", 
    "Peaceful", "Nervous", "Tired", "Amused", "Surprised", "Jealous", 
    "Grateful", "Annoyed", "Energetic", "Calm", "Lonely", "Proud", 
    "Scared", "Confident", "Pensive", "Enthusiastic", "Indifferent", 
    "Happy", "Relieved", "Guilty", "Inspired", "Envious", "Nostalgic", 
    "Miserable", "Cheerful", "Stressed"
  ];

  const navigate = useNavigate();
<<<<<<< HEAD
  const fetchMood = async (mood) => {
    navigate(`/mood/${mood}`);
  };

  return (
    <div style={{ backgroundColor: 'rgb(21,27,41)' }} className='min-h-screen p-4 flex flex-col items-center'>
      <h1 className='text-2xl font-bold mb-6 text-blue-600'>Select your mood</h1>

      <div className='flex flex-wrap gap-4 justify-center mb-6 w-full max-w-4xl  '>
=======
  const fetchMood = async (mood)=>{
    navigate(`/mood/${mood}`);
  }
  return (
    <div>
      <h1 className='text-xl font-bold mb-4'>Select your mood</h1>
      <div className='flex flex-wrap gap-4'>
>>>>>>> d736c86c3e0e33b3ec582ffe13727231ebacaf58
        {moods.map((mood) => (
          <button
            onClick={() => fetchMood(mood)}
            key={mood}
<<<<<<< HEAD
            className='bg-white hover:bg-blue-500 text-black border border-gray-300 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105'>
=======
            className='bg-smoke hover:bg-blue-700 text-black border border-500 font-bold py-2 px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100'>
>>>>>>> d736c86c3e0e33b3ec582ffe13727231ebacaf58
            {mood}
          </button>
        ))}
      </div>
<<<<<<< HEAD

      <div style={{ backgroundColor: 'rgb(18,21,32)' }} className='text-center border border-white rounded-md p-4 mb-6'>
        <p className='text-xl font-bold text-blue-400 mb-2'>
          Find Perfect Anime 
        </p>
        <p className='text-sm font-sans font-bold text-white'>
          Find Perfect Anime That You Like 
        </p>
      </div>

      <div style={{ backgroundColor: 'rgb(18,21,32)' }} className='text-center border border-white rounded-md p-4 mb-6'>
        <p className='text-xl font-bold text-blue-400 mb-2'>AnimeList Based Animes</p>
        <p className='text-sm font-sans font-bold text-white'>
          Various Collection of Animes from Anime List based on your mood
        </p>
      </div>

      <div style={{ backgroundColor: 'rgb(18,21,32)' }} className='text-center border border-white rounded-md p-4 mb-6'>
        <p className='text-lg font-semibold text-blue-400 mb-1'>Mood Based Animes</p>
        <p className='text-sm text-white'>
          Find the Best Anime Recommendations based on your mood
        </p>
      </div>
=======
>>>>>>> d736c86c3e0e33b3ec582ffe13727231ebacaf58
    </div>
  );
};

export default MoodPage;
