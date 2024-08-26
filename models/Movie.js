import mongoose from 'mongoose';

// Definindo o schema para o filme
const movieSchema = new mongoose.Schema({
  tmdb_id: {
    type: Number,
    unique: true, // Garante que o TMDB ID seja único
  },
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    default: '',
  },
  release_date: {
    type: Date,
    default: null,
  },
  poster_path: {
    type: String,
    default: '',
  },
  vote_average: {
    type: Number,
    min: 0,
    max: 10,
  },
  // Adicione outros campos se necessário
}, {
  timestamps: true
});

// Registrando e exportando o modelo
const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
