import { combineReducers } from 'redux';
import {
  QUERY_MOVIES,
  RECEIVE_MOVIES_QUERY,
  SELECT_MOVIE,
  DISCOVER_MOVIES,
  MOVIE_GENRES,
  MOVIE_DETAIL,
  GET_MOVIE_REQUEST,
  MOVIE_RECOMMENDATIONS,
  MOVIES_CASTS,
  GET_IMDB_INFO,
  MOVIE_REVIEWS,
  TRENDING_MOVIES,
  NOW_PLAYING_MOVIES,
  POPULAR_MOVIES,
  TOP_RATED_MOVIES,
  UPCOMING_MOVIES,
  FETCH_LOCATION,
  GEOPOSITION_SEARCH,
  GET_LOCATION_KEY,
  GET_TEMPERATURE
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
    items: [],
    trending: {},
    nowPlaying: {},
    popularMovie: {},
    topRatedMovie: {},
    upcomingMovie: {}
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
    case TRENDING_MOVIES:
      return Object.assign({}, state, {
        isFetching: false,
        trending: {
          page: action.page,
          data: action.data
        }
      });
    case NOW_PLAYING_MOVIES:
      return Object.assign({}, state, {
        isFetching: false,
        nowPlaying: {
          page: action.page,
          data: action.data
        }
      });
    case POPULAR_MOVIES:
      return Object.assign({}, state, {
        isFetching: false,
        popularMovie: {
          page: action.page,
          data: action.data
        }
      });
    case TOP_RATED_MOVIES:
      return Object.assign({}, state, {
        isFetching: false,
        topRatedMovie: {
          page: action.page,
          data: action.data
        }
      });
    case UPCOMING_MOVIES:
      return Object.assign({}, state, {
        isFetching: false,
        upcomingMovie: {
          page: action.page,
          data: action.data
        }
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

function fetchWeather(
  state = {
    isFetching: false,
    didInvalidate: false,
    geopostion: {},
    weatherResult: [],
    temperature: {}
  },
  action
) {
  switch (action.type) {
    case FETCH_LOCATION:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case GEOPOSITION_SEARCH:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        geopostion: {
          latitude: action.latitude,
          longitude: action.longitude
        }
      });
    case GET_LOCATION_KEY:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        location: action.location,
        weatherResult: action.result
      });
    case GET_TEMPERATURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        temperature: action.temperature
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectedMovie,
  fetchMovies,
  discovery,
  fetchWeather
});
export default rootReducer;
