import axios from 'axios';

import {
  SELECT_MOVIE,
  QUERY_MOVIES,
  GET_MOVIE_REQUEST,
  MOVIE_DETAIL,
  TRENDING_MOVIES,
  NOW_PLAYING_MOVIES,
  POPULAR_MOVIES,
  TOP_RATED_MOVIES,
  UPCOMING_MOVIES,
  MOVIE_RECOMMENDATIONS,
  MOVIES_CASTS,
  RECEIVE_MOVIES_QUERY,
  DISCOVER_MOVIES,
  MOVIE_GENRES,
  MOVIE_REVIEWS,
  GET_IMDB_INFO
} from './consts';

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

function receiveTrendingMovies(page, data) {
  return {
    type: TRENDING_MOVIES,
    page,
    data
  };
}

function receiveNowPlayingMovies(page, data) {
  return {
    type: NOW_PLAYING_MOVIES,
    page,
    data
  };
}

function receivePopularMovies(page, data) {
  return {
    type: POPULAR_MOVIES,
    page,
    data
  };
}

function receiveTopRatedMovies(page, data) {
  return {
    type: TOP_RATED_MOVIES,
    page,
    data
  };
}

function receiveUpcomingMovies(page, data) {
  return {
    type: UPCOMING_MOVIES,
    page,
    data
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

function movieReviews(id, reviews) {
  return {
    type: MOVIE_REVIEWS,
    id,
    reviews
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
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&language=en-US&&query=${movie}&page=1&include_adult=false&region=us`
      )
      .then(response => response.data)
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

export function getMovieReviews(id) {
  return dispatch => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&language=en-US&page=1`
      )
      .then(response => response.data.results)
      .then(reviews => dispatch(movieReviews(id, reviews)));
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

export function fetchTrendingMovie(page) {
  return dispatch => {
    return axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&language=en-US&page=${page}`
      )
      .then(response => response.data)
      .then(trending => dispatch(receiveTrendingMovies(page, trending)));
  };
}

export function fetchNowPlayingMovie(page) {
  return dispatch => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&language=en-US&page=${page}`
      )
      .then(response => response.data)
      .then(nowPlaying => dispatch(receiveNowPlayingMovies(page, nowPlaying)));
  };
}

export function fetchPopularMovie(page) {
  return dispatch => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&language=en-US&page=${page}`
      )
      .then(response => response.data)
      .then(popularMovies =>
        dispatch(receivePopularMovies(page, popularMovies))
      );
  };
}

export function fetchTopRatedMovie(page) {
  return dispatch => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&language=en-US&page=${page}`
      )
      .then(response => response.data)
      .then(topRatedMovies =>
        dispatch(receiveTopRatedMovies(page, topRatedMovies))
      );
  };
}

export function fetchUpcomingMovie(page) {
  return dispatch => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&language=en-US&page=${page}`
      )
      .then(response => response.data)
      .then(upcomingMovie =>
        dispatch(receiveUpcomingMovies(page, upcomingMovie))
      );
  };
}
