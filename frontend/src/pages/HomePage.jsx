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
        <Link to='/'><p className='text-3xl font-bold text-red-500 cursor-pointer'>NAME</p></Link>
        <ul className='flex justify-center space-x-4 my-2 text-gray-400 text-md'>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/mood'>Mood Anime</Link></li>
        </ul>
      </nav>

      <div className='my-8 lg:h-1/3 sm:h-1/4'>
        <div className='flex justify-center'>
          <h1 className='text-2xl font-bold text-red-500'>Airing</h1>
        </div>
        <div className='flex m-2'>
          {airingAnime.map((anime) => (
            <Card key={anime.mal_id} data={anime} />
          ))}
        </div>
      </div>

      <div className='my-8 lg:h-1/3 sm:h-1/4'>
        <div className='flex justify-center'>
          <h1 className='text-2xl font-bold text-red-500'>Upcoming</h1>
        </div>
        <div className='flex m-2'>
          {upcomingAnime.map((anime) => (
            <Card key={anime.mal_id} data={anime} />
          ))}
        </div>
      </div>

      <div className='my-8 lg:h-1/3 sm:h-1/4'>
        <div className='flex justify-center'>
          <h1 className='text-2xl font-bold text-red-500'>Popular</h1>
        </div>
        <div className='flex m-2 '>
          {popularAnime.map((anime) => (
            <Card key={anime.mal_id} data={anime} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
