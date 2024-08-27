import axios from 'axios';
import User from '../models/User.js';

const getMovieData = async (type, page) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_URL}/movie/${type}?language=en-US&page=${page}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

const searchMovieData = async (query, page) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_URL}/search/movie?query=${query}&page=${page}&language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
export const getPopularMovies = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const data = await getMovieData('popular', page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUpcomingMovies = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const data = await getMovieData('upcoming', page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopRatedMovies = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const data = await getMovieData('top_rated', page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNowPlayingMovies = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const data = await getMovieData('now_playing', page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchMovies = async (req, res) => {
  const page = req.query.page || 1;
  const query = req.query.query || '';
  try {
    const data = await searchMovieData(query, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).populate('favorites');
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFavorite = async (req, res) => {
  const { movieId } = req.body;
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    if (user.favorites.includes(movieId)) {
      return res.status(400).json({ message: 'Filme já está nos favoritos!' });
    }

    user.favorites.push(movieId);
    await user.save();

    res.json({ message: 'Filme adicionado aos favoritos!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  const { movieId } = req.body;
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    user.favorites = user.favorites.filter(fav => fav.toString() !== movieId);
    await user.save();

    res.json({ message: 'Filme removido dos favoritos!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
