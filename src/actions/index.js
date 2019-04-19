import axios from 'axios';

export const SELECT_MOVIE = 'SELECT_MOVIE';
export const QUERY_MOVIES = 'QUERY_MOVIES';
export const RECEIVE_MOVIES_QUERY = 'RECEIVE_MOVIES_QUERY';
export const DISCOVER_MOVIES = 'DISCOVER_MOVIES';
export const MOVIE_DETAIL = 'MOVIE_DETAIL';
export const MOVIE_GENRES = 'MOVIE_GENRES';
export const TRENDING_MOVIES = 'TRENDING_MOVIES';
export const GET_MOVIE_REQUEST = 'GET_MOVIE_REQUEST';
export const MOVIE_RECOMMENDATIONS = 'MOVIE_RECOMMENDATIONS';
export const MOVIES_CASTS = 'MOVIES_CASTS';
export const GET_IMDB_INFO = 'GET_IMDB_INFO';

export function selectMovie(movie) {
  return {
    type: SELECT_MOVIE,
    movie
  };
}

function queryMovie(movie) {
  return {
    type: QUERY_MOVIES,
    movie
  };
}

function getMovieRequest() {
  return {
    type: GET_MOVIE_REQUEST
  };
}

function movieDetail(id, result) {
  return {
    type: MOVIE_DETAIL,
    id,
    result
  };
}

function trendingMovies(results) {
  return {
    type: TRENDING_MOVIES,
    results
  };
}

function movieRecommendations(id, results) {
  return {
    type: MOVIE_RECOMMENDATIONS,
    id,
    results
  };
}

function movieCredits(id, credits) {
  return {
    type: MOVIES_CASTS,
    id,
    credits
  };
}

function receiveMovieQuery(movie, results) {
  return {
    type: RECEIVE_MOVIES_QUERY,
    movie,
    data: results,
    receivedAt: Date.now()
  };
}

function discoverMovie(results) {
  return {
    type: DISCOVER_MOVIES,
    data: results
  };
}

function getMovieList(genres) {
  return {
    type: MOVIE_GENRES,
    genres
  };
}

function getMovieInfo(info) {
  return {
    type: GET_IMDB_INFO,
    info
  };
}

export function fetchDiscoverMovie() {
  return dispatch => {
    dispatch(getMovieRequest());
    return axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`
      )
      .then(response => response.data.results)
      .then(results => dispatch(discoverMovie(results)));
  };
}

export function searchMovie(movie) {
  return dispatch => {
    dispatch(queryMovie(movie));
    return axios
      .get(
        `https://api.themoviedb.org/3/search/keyword?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&query=${movie}&page=1`
      )
      .then(response => response.data.results)
      .then(results => dispatch(receiveMovieQuery(movie, results)));
  };
}

export function queryForDetails(id) {
  return dispatch => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&append_to_response=videos,images`
      )
      .then(response => response.data)
      .then(detail => dispatch(movieDetail(id, detail)));
  };
}

export function getMovieGenre() {
  return dispatch => {
    return axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&language=en-US`
      )
      .then(response => response.data.genres)
      .then(genres => dispatch(getMovieList(genres)));
  };
}

export function getTrendingMovie() {
  return dispatch => {
    return axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }`
      )
      .then(response => response.data.results)
      .then(trending => dispatch(trendingMovies(trending)));
  };
}

export function getRecommendationMovie(id) {
  return dispatch => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&language=en-US&page=1`
      )
      .then(response => response.data.results)
      .then(recommendations =>
        dispatch(movieRecommendations(id, recommendations))
      );
  };
}

export function getMovieCredits(id) {
  return dispatch => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }`
      )
      .then(response => response.data)
      .then(credits => dispatch(movieCredits(id, credits)));
  };
}

export function getIMDBMovieInfo(id) {
  return dispatch => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&append_to_response=videos,images`
      )
      .then(response => {
        return axios
          .get(
            `http://www.omdbapi.com/?i=${response.data.imdb_id}&apikey=${
              process.env.REACT_APP_OMDB_API_KEY
            }`
          )
          .then(response => response.data)
          .then(info => dispatch(getMovieInfo(info)));
      });
  };
}
