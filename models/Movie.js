import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: String,
  overview: String,
  release_date: String,
  poster_path: String,
  vote_average: Number
});

export default mongoose.model('Movie', movieSchema);
