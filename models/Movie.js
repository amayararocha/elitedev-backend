import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  adult: { type: Boolean, default: false },
  backdrop_path: { type: String },
  genre_ids: [{ type: Number }],
  id: { type: Number, unique: true },
  original_language: { type: String },
  original_title: { type: String },
  overview: { type: String },
  popularity: { type: Number },
  poster_path: { type: String },
  release_date: { type: Date },
  title: { type: String },
  video: { type: Boolean, default: false },
  vote_average: { type: Number },
  vote_count: { type: Number }
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
