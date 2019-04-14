import axios from 'axios';

require('dotenv').config();

export const QUERY_MOVIES = 'QUERY_MOVIES';
export const RECEIVE_MOVIES_QUERY = 'RECEIVE_MOVIES_QUERY';

const MOVIE_DB_API_KEY = process.env.MOVIE_DB_API_KEY;

function queryMovie(movie) {
  return {
    type: QUERY_MOVIES,
    movie
  };
}

function receiveMovieQuery(movie, json) {
  return {
    type: RECEIVE_MOVIES_QUERY,
    movie,
    data: json.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

function searchMovie(movie) {
  return dispatch => {
    dispatch(queryMovie(movie));
    return axios
      .post(
        `https://api.themoviedb.org/3/search/keyword?api_key=${MOVIE_DB_API_KEY}&query=${movie}&page=1`
      )
      .then(response => response.data.json())
      .then(json => dispatch(receiveMovieQuery(movie, json)));
  };
}
