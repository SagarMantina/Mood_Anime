import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const HomePage = () => {
  const [airingAnime, setAiringAnime] = useState([]);
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const airingResponse = await fetch('http://localhost:5000/api/airing');
        const airingData = await airingResponse.json();
        setAiringAnime(airingData);

        const upcomingResponse = await fetch('http://localhost:5000/api/upcoming');
        const upcomingData = await upcomingResponse.json();
        setUpcomingAnime(upcomingData);

        const popularResponse = await fetch('http://localhost:5000/api/popular');
        const popularData = await popularResponse.json();
        setPopularAnime(popularData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-black min-h-screen text-white m-0'>
      <nav className="flex justify-center space-x-4">
        <Link to='/'><p className='lg:text-3xl font-bold text-red-500 cursor-pointer sm:text-xl py-2'>ANIME MOOD</p></Link>
        <ul className='flex justify-center space-x-4 my-2 text-gray-400 text-md'>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/mood'>Select Mood</Link></li>
        </ul>
      </nav>
      
      <div>
         <p className='lg:text-2xl font-bold text-center sm:text-sm'>This Is Anime Mood Which Recommends Latest Or Popular Anime To the The Users Besides That It also Has Feature To Select Mood which Gives Anime Recommendation Based on The Selected Mood</p>
      </div>
      <div className='my-8 lg:h-1/3 sm:h-1/4'>
        <div className='flex justify-center'>
          <h1 className='text-2xl font-bold text-red-500'>Airing</h1>
        </div>
        <div className='lg:flex m-2 sm:grid grid-cols-3 grid'>
          {airingAnime.map((anime) => (
            <Card key={anime.mal_id} data={anime} />
          ))}
        </div>
      </div>

   

      <div className='my-8 lg:h-1/3 sm:h-1/4'>
        <div className='flex justify-center'>
          <h1 className='text-2xl font-bold text-red-500'>Upcoming</h1>
        </div>
        <div className='lg:flex m-2 sm:grid grid-cols-3 grid'>
          {upcomingAnime.map((anime) => (
            <Card key={anime.mal_id} data={anime} />
          ))}
        </div>
      </div>

      <div className='my-8 lg:h-1/3 sm:h-1/4'>
        <div className='flex justify-center'>
          <h1 className='text-2xl font-bold text-red-500'>Popular</h1>
        </div>
        <div className='lg:flex m-2 sm:grid grid-cols-3 grid'>
          {popularAnime.map((anime) => (
            <Card key={anime.mal_id} data={anime} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
