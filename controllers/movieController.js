import axios from 'axios';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Movie from '../models/Movie.js';

// Funções para obter dados de filmes
const getMovieData = async (type, page) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_URL}/movie/${type}?language=en-US&page=${page}&api_key=${process.env.TMDB_TOKEN}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

const searchMovieData = async (query, page) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_URL}/search/movie?query=${query}&page=${page}&language=en-US&api_key=${process.env.TMDB_TOKEN}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Controladores de rotas
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
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function addFavorite(userId, movieData) {
  try {
    // Verifica se os parâmetros necessários estão presentes
    if (!userId || !movieData || !movieData.id) {
      throw new Error('userId, movieData, ou movieData.id não estão definidos!');
    }

    // Verifica se o filme já existe no banco de dados usando tmdb_id
    let movie = await Movie.findOne({ tmdb_id: movieData.id });
    
    if (!movie) {
      // Se o filme não existir, cria um novo
      movie = new Movie({
        tmdb_id: movieData.id,
        title: movieData.title,
        overview: movieData.overview,
        release_date: movieData.release_date,
        poster_path: movieData.poster_path,
        vote_average: movieData.vote_average,
      });
      await movie.save();
    }

    // Adiciona o filme aos favoritos do usuário
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: movie._id } },
      { new: true }
    );

    // Retorna o usuário atualizado com seus favoritos
    const updatedUser = await User.findById(userId).populate('favorites');
    
    return { success: true, favorites: updatedUser.favorites };
  } catch (error) {
    console.error('Error:', error.message); // Adiciona log de erro para depuração
    return { success: false, message: error.message };
  }
}

export const removeFavorite = async (req, res) => {
  const { movieId } = req.body;

  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Verifica se o movieId é numérico e trata-o como string
    const movieIdString = movieId.toString();

    user.favorites = user.favorites.filter(fav => fav !== movieIdString);
    await user.save();

    res.json({ message: 'Filme removido dos favoritos!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
