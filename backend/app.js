


const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const app = express();
const cookie_parser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(cookie_parser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userroutes = require("./routes/user");
app.use("/user", userroutes);

mongoose
  .connect("mongodb://localhost:27017/sm", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const cache = {
  airing: null,
  upcoming: null,
  popular: null,
};
const cacheExpiration = 10 * 60 * 1000; // 10 minutes

async function searchAnimeByGenre(genreId, page) {
  const url = `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data?.data?.length > 0 ? data.data : [];
  } catch (error) {
    console.error(`Error searching anime by genre ID "${genreId}":`, error);
    return [];
  }
}

async function fetchAnimeDetails(animeData) {
  try {
    return {
      name: animeData.title,
      mal_id: animeData.mal_id,
      image: animeData.images?.jpg?.image_url || 'No image available',
      description: animeData.synopsis,
      rating: animeData.rating,
      score: animeData.score,
    };
  } catch (error) {
    console.error(`Error fetching details for anime "${animeData.title}":`, error);
    return null;
  }
}

const fetchAnimeData = async (filter) => {
  const baseUrl = "https://api.jikan.moe/v4/top/anime";
  const response = await fetch(`${baseUrl}?type=tv&filter=${filter}&rating=pg13&sfw=true&page=1&limit=10`);
  if (!response.ok) {
    throw new Error(`Failed to fetch from Jikan API: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data;
};

async function fetchAnimeByGenre(genreId, l, f) {
  
  const randomPage = Math.floor(Math.random() *30) + 1;
  
  const url = `https://api.jikan.moe/v4/anime?genres=${genreId}&limit=${l}&page=${randomPage}&filter=${f}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    
   
    return data.data;
  } catch (error) {
    console.error(`Error fetching anime for genre ID ${genreId}:`, error);
    return [];
  }
}
app.get('/api/mood/:mood', async (req, res) => {
  const { mood } = req.params;
  if (!mood) {
    return res.status(400).json({ error: 'Mood parameter is required' });
  }

  try {
    const generes_data = await fetch('https://api.jikan.moe/v4/genres/anime');
    const data = await generes_data.json();
    const genres = data.data;
    const genre_names = genres.map(genre => genre.name);
    const genre_ids = genres.map(genre => genre.mal_id);

    const prompt = `Given the mood "${mood}" and the available anime genres "${genre_names.join(', ')}" with corresponding IDs "${genre_ids.join(', ')}", choose the most suitable 6-7 genres for this mood. Map the selected genre names to their IDs and provide a JSON response with randomly selected IDs and limits, also make sure summ of the all limits is equal or less than 20. Vary the genre names while ensuring they align with the mood also try to give the data in different ordering of IDs value . The format should be strictly JSON without any comments or additional text. Example: [{"id":1,"limit":3},{"id":2,"limit":3}].`;
  
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
   

    const genreIds = JSON.parse(responseText);
  

    let finalAnimeList = [];

    for (const genre of genreIds) {
      let filter;
      let randomfilter = Math.floor(Math.random() *4) + 1;
      if(randomfilter === 1){
        filter = "themes";
      }else if(randomfilter === 2){
        filter = "type";
      }else if(randomfilter === 3){
        filter = "status";
      }else if(randomfilter === 4){
        filter = "producers";
      }
      else{
        filter = "themes";
      }
        
      const animeList = await fetchAnimeByGenre(genre.id, genre.limit, filter);
      
      if (Array.isArray(animeList)) {
        for (const anime of animeList) {
          const details = await fetchAnimeDetails(anime);
          if (details) {
            finalAnimeList.push(details);
          }
        }
      }
    }

    return res.json(finalAnimeList);
  } catch (error) {
    console.error(`Error fetching ${mood} anime:`, error);
    res.status(500).json({ error: `Failed to fetch ${mood} anime` });
  }
});

app.get('/api/airing', async (req, res) => {
  if (cache.airing && (Date.now() - cache.airing.timestamp < cacheExpiration)) {
    return res.json(cache.airing.data);
  }
  try {
    const data = await fetchAnimeData('airing');
    cache.airing = { data, timestamp: Date.now() };
    res.json(data);
  } catch (error) {
    console.error('Error fetching airing anime:', error);
    res.status(500).json({ error: 'Failed to fetch airing anime' });
  }
});

app.get('/api/upcoming', async (req, res) => {
  if (cache.upcoming && (Date.now() - cache.upcoming.timestamp < cacheExpiration)) {
    return res.json(cache.upcoming.data);
  }
  try {
    const data = await fetchAnimeData('upcoming');
    cache.upcoming = { data, timestamp: Date.now() };
    res.json(data);
  } catch (error) {
    console.error('Error fetching upcoming anime:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming anime' });
  }
});

app.get('/api/popular', async (req, res) => {
  if (cache.popular && (Date.now() - cache.popular.timestamp < cacheExpiration)) {
    return res.json(cache.popular.data);
  }
  try {
    const data = await fetchAnimeData('bypopularity');
    cache.popular = { data, timestamp: Date.now() };
    res.json(data);
  } catch (error) {
    console.error('Error fetching popular anime:', error);
    res.status(500).json({ error: 'Failed to fetch popular anime' });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
