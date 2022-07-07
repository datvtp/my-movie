export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const API_KEY = "48e2b288afea3c2a489ca7a2a95546f5";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbImageEndpoint = "https://image.tmdb.org/t/p";
export const tmdbAPI = {
  getMovieList: (type) => `${tmdbEndpoint}/${type}?api_key=${API_KEY}`,
  getMovieListByPage: (type, nextPage) =>
    `${tmdbEndpoint}/${type}?api_key=${API_KEY}&page=${nextPage}`,
  getSearchMovie: (filterDebounce, nextPage) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${filterDebounce}&page=${nextPage}`,
  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${API_KEY}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${API_KEY}`,
  getImage: (type, path) => `${tmdbImageEndpoint}/${type}/${path}`,
};
