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
  const fetchMood = async (mood)=>{
    navigate(`/mood/${mood}`);
  }
  return (
    <div>
      <h1 className='text-xl font-bold mb-4'>Select your mood</h1>
      <div className='flex flex-wrap gap-4'>
        {moods.map((mood) => (
          <button
            onClick={() => fetchMood(mood)}
            key={mood}
            className='bg-smoke hover:bg-blue-700 text-black border border-500 font-bold py-2 px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100'>
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodPage;
