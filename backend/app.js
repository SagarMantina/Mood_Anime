<<<<<<< HEAD



=======
>>>>>>> d736c86c3e0e33b3ec582ffe13727231ebacaf58
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const app = express();
const cookie_parser = require("cookie-parser");
<<<<<<< HEAD
const cors = require('cors');
require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
=======

const cors = require('cors');

require('dotenv').config();

const {GoogleGenerativeAI} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

>>>>>>> d736c86c3e0e33b3ec582ffe13727231ebacaf58

app.use(cors());
app.use(cookie_parser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userroutes = require("./routes/user");
<<<<<<< HEAD
=======

>>>>>>> d736c86c3e0e33b3ec582ffe13727231ebacaf58
app.use("/user", userroutes);

mongoose
  .connect("mongodb://localhost:27017/sm", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
<<<<<<< HEAD
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
=======
    console.log("Error connecting to MongoDB", err);
  });




  const cache = {
    airing: null,
    upcoming: null,
    popular: null,
  };
  
  const cacheExpiration = 10 * 60 * 1000; // Cache expiration time in milliseconds (10 minutes)

  async function searchAnimeByGenre(genreId, page) {
    const url = `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data?.data?.length > 0) {
        return data.data;
      } else {
      
        return [];
      }
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
  let genres = [];

  async function fetchAnimeByGenre(genreId, limit = 10) {
    const url = `https://api.jikan.moe/v4/anime?genres=${genreId}&limit=${limit}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.data; // Return the list of anime
    } catch (error) {
      console.error(`Error fetching anime for genre ID  ${genreId}:`, error);
    }
  }
  
  app.get('/api/genres', async (req, res) => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/genres/anime');
      const data = await response.json();
      genres.push(...data.data); // Store the available genres
      res.json(data);
    } catch (error) {
      console.error('Error fetching anime genres:', error);
      res.status(500).json({ error: 'Failed to fetch anime genres' });
    }
  });
  
  app.get('/api/mood/:mood', async (req, res) => {
    const { mood } = req.params;
    if (!mood) {
      return res.status(400).json({ error: 'Mood parameter is required' });
    }
    
    try {
      const prompt = `Based on the mood "${mood}", provide a list of anime genres that are recognized by MyAnimeList. Respond with a JSON array of genre IDs and limits for the number of anime per genre. The format should be strictly JSON without any comments or additional text. Choose genre IDs randomly that mostly match the given mood. Example format: [{"id":1,"limit":3},{"id":2,"limit":3}]`;
      let final_anime_list=[];
      let endResult=[];
    
     
        const result = await model.generateContent(prompt);
        let responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        // console.log(responseText);

          const genreIds = JSON.parse(responseText);
    
          for (const genre of genreIds) {
            const animeList = await searchAnimeByGenre(genre.id, genre.limit);
    
            for (const anime of animeList) {
            
              const details = await fetchAnimeDetails(anime);
              if (details) {
                final_anime_list.push(details);
              }
            }
             
           
          }
          let inx=0;
          for(const anime of final_anime_list){
    
            if(anime.name)
            {
              if(inx==15) break;
              inx++;
             
              endResult.push(anime);
            
            }
    
        }    

       return res.json(endResult);
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

>>>>>>> d736c86c3e0e33b3ec582ffe13727231ebacaf58

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
