import { combineReducers } from 'redux';
import {
  QUERY_MOVIES,
  RECEIVE_MOVIES_QUERY,
  SELECT_MOVIE,
  DISCOVER_MOVIES,
  MOVIE_GENRES,
  MOVIE_DETAIL,
  TRENDING_MOVIES,
  GET_MOVIE_REQUEST,
  MOVIE_RECOMMENDATIONS,
  MOVIES_CASTS,
  GET_IMDB_INFO,
  MOVIE_REVIEWS
} from '../actions';

function selectedMovie(state = '', action) {
  switch (action.type) {
    case SELECT_MOVIE:
      console.log('SELECT_MOVIE: ', action);
      return action.movie;
    default:
      return state;
  }
}

function fetchMovies(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case QUERY_MOVIES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_MOVIES_QUERY:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        movie: action.movie,
        items: action.data,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function discovery(
  state = {
    isFetching: false,
    didInvalidate: false,
    movies: [],
    genres: [],
    detail: {},
    trending: [],
    recommendations: [],
    imdb: {}
  },
  action
) {
  switch (action.type) {
    case GET_MOVIE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case DISCOVER_MOVIES:
      console.log('DISCOVER_MOVIES: ', action);
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        movies: action.data
      });
    case MOVIE_GENRES:
      return Object.assign({}, state, {
        isFetching: false,
        genres: action.genres
      });
    case MOVIE_DETAIL:
      return Object.assign({}, state, {
        isFetching: false,
        detail: action.result
      });
    case TRENDING_MOVIES:
      return Object.assign({}, state, {
        isFetching: false,
        trending: action.results
      });
    case MOVIE_RECOMMENDATIONS:
      return Object.assign({}, state, {
        isFetching: false,
        id: action.id,
        recommendations: action.results
      });
    case MOVIES_CASTS:
      return Object.assign({}, state, {
        isFetching: false,
        id: action.id,
        credits: action.credits
      });
    case MOVIE_REVIEWS:
      return Object.assign({}, state, {
        isFetching: false,
        id: action.id,
        reviews: action.reviews
      });
    case GET_IMDB_INFO:
      return Object.assign({}, state, {
        isFetching: false,
        imdb: action.info
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({ selectedMovie, fetchMovies, discovery });

export default rootReducer;
