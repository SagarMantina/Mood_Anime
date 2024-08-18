import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Part from '../components/Part';

<<<<<<< HEAD

function ResultPage() {
  console.log("Component rendered");
=======
function ResultPage() {
>>>>>>> d736c86c3e0e33b3ec582ffe13727231ebacaf58
  const { mood } = useParams();
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    console.log("Fetching data");
=======
>>>>>>> d736c86c3e0e33b3ec582ffe13727231ebacaf58
    const fetchAnimeByMood = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/mood/${mood}`);
        if (!response.ok) {
          throw new Error('Failed to fetch anime data');
        }

        const data = await response.json();
        setAnimeList(data);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    fetchAnimeByMood();
  }, [mood]);

  return (
    <div className='bg-black min-h-screen text-white m-0'>
<<<<<<< HEAD
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-extrabold text-center text-red-500 mb-6'>
          Anime Based on Your Mood
        </h1>
        <h2 className='text-2xl font-bold text-center text-gray-600 mb-12'>
          Mood: {mood}
        </h2>

        {/* <div className=' sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8 grid'> */}
        <div className=' lg:grid-cols-4 lg:gap-8 sm:grid grid-cols-3 grid p-4 sm:gap-4 '>
        {animeList.map((anime, index) => (
            <Part key={index} anime={anime} />
          ))}
        </div>
      </div>
    </div>
  );
}


=======
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-extrabold text-center text-red-500 mb-6'>
        Anime Based on Your Mood
      </h1>
      <h2 className='text-2xl font-bold text-center text-gray-600 mb-12'>
        Mood: {mood}
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {animeList.map((anime, index) => (
          <Part key={index} anime={anime} />
        ))}
      </div>
    </div>
    </div>
  );
}

>>>>>>> d736c86c3e0e33b3ec582ffe13727231ebacaf58
export default ResultPage;
