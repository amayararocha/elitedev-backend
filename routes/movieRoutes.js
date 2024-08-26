import { Router } from 'express';
import {
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  searchMovies,
  getFavorites,
  addFavorite,
  removeFavorite
} from '../controllers/movieController.js';
import { authenticateToken } from '../jwt/Jwt.js';

const router = Router();

router.get('/popular', authenticateToken, getPopularMovies);
router.get('/upcoming', authenticateToken, getUpcomingMovies);
router.get('/top_rated', authenticateToken, getTopRatedMovies);
router.get('/now_playing', authenticateToken, getNowPlayingMovies);
router.get('/search', authenticateToken, searchMovies);
router.get('/favorites', authenticateToken, getFavorites);
router.post('/favorites', authenticateToken, addFavorite);
router.delete('/favorites', authenticateToken, removeFavorite);

export default router;
