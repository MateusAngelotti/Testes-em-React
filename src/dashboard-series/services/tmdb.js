import axios from 'axios';

const API_KEY = 'c3ae3ae05ee402525eed4228e07b1e1d';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

export const fetchPopularMovies = async () => {
  const response = await tmdb.get('/movie/popular');
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await tmdb.get(`/movie/${id}`);
  return response.data;
};

export const fetchPopularSeries = async () => {
  const response = await tmdb.get('/tv/popular');
  return response.data.results;
};

export const getSeriesDetails = async (id) => {
  const response = await tmdb.get(`/tv/${id}`);
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await tmdb.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};

export const searchSeries = async (query) => {
  const response = await tmdb.get('/search/tv', {
    params: { query },
  });
  return response.data.results;
};