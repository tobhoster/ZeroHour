import axios from 'axios';

export const SELECT_MOVIE = 'SELECT_MOVIE';
export const QUERY_MOVIES = 'QUERY_MOVIES';
export const RECEIVE_MOVIES_QUERY = 'RECEIVE_MOVIES_QUERY';
export const DISCOVER_MOVIES = 'DISCOVER_MOVIES';
export const MOVIE_DETAIL = 'MOVIE_DETAIL';
export const MOVIE_GENRES = 'MOVIE_GENRES';
export const GET_MOVIE_REQUEST = 'GET_MOVIE_REQUEST';
export const MOVIE_RECOMMENDATIONS = 'MOVIE_RECOMMENDATIONS';
export const MOVIES_CASTS = 'MOVIES_CASTS';
export const GET_IMDB_INFO = 'GET_IMDB_INFO';
export const MOVIE_REVIEWS = 'MOVIE_REVIEWS';
export const TRENDING_MOVIES = 'TRENDING_MOVIES';
export const NOW_PLAYING_MOVIES = 'NOW_PLAYING_MOVIES';
export const POPULAR_MOVIES = 'POPULAR_MOVIES';
export const TOP_RATED_MOVIES = 'TOP_RATED_MOVIES';
export const UPCOMING_MOVIES = 'UPCOMING_MOVIES';

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

/** WEATHER */
export const FETCH_LOCATION = 'FETCH_LOCATION';
export const GEOPOSITION_SEARCH = 'GEOPOSITION_SEARCH';
export const GET_LOCATION_KEY = 'GET_LOCATION_KEY';
export const GET_TEMPERATURE = 'GET_TEMPERATURE';

function fetchLocation(location) {
  return {
    type: FETCH_LOCATION,
    location
  };
}

function fetchLocationUsingGeolocation(latitude, longitude) {
  return {
    type: GEOPOSITION_SEARCH,
    latitude,
    longitude
  };
}

function getLocationKey(location, result) {
  return {
    type: GET_LOCATION_KEY,
    location,
    result
  };
}

function getTemperature(temperature) {
  console.log('getTemperature: ', temperature);
  return {
    type: GET_TEMPERATURE,
    temperature
  };
}

export function fetchLocationKey(location) {
  return dispatch => {
    dispatch(fetchLocation(location));
    return axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/search?apikey=${
          process.env.REACT_APP_WEATHER_API_KEY
        }&q=${location}`
      )
      .then(response => response.data)
      .then(result => dispatch(getLocationKey(location, result)));
  };
}

// Fetch Weather Condition using Geolocation
export function fetchWeatherConditionUsingGeoLocation(latitude, longitude) {
  return dispatch => {
    dispatch(fetchLocationUsingGeolocation(latitude, longitude));
    return axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${
          process.env.REACT_APP_WEATHER_API_KEY
        }&q=${latitude},${longitude}`
      )
      .then(response => {
        return axios
          .get(
            `http://dataservice.accuweather.com/currentconditions/v1/${
              response.data.Key
            }?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`
          )
          .then(response => {
            console.log(
              'fetchWeatherConditionUsingGeoLocation: ',
              response.data[0]
            );
            return response.data[0].Temperature;
          })
          .then(temperature => dispatch(getTemperature(temperature)));
      });
  };
}

// Fetch Weather Condition using Location
export function fetchWeatherConditionUsingLocation(location) {
  return dispatch => {
    dispatch(fetchLocation(location));
    return axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/search?apikey=${
          process.env.REACT_APP_WEATHER_API_KEY
        }&q=${location}`
      )
      .then(response => {
        return dispatch => {
          dispatch(fetchLocation(location));
          return axios
            .get(
              `http://dataservice.accuweather.com/currentconditions/v1/${
                response.data.Key
              }apikey=${process.env.REACT_APP_WEATHER_API_KEY}`
            )
            .then(response => response.data.Temperature)
            .then(temperature => dispatch(getTemperature(temperature)));
        };
      });
  };
}
