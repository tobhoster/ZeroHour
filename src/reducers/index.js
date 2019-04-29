import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import selectedMovie from './selectedMovieReducer';
import fetchMovies from './fetchMoviesReducer';
import discovery from './discoveryReducer';
import fetchWeather from './fetchWeatherReducer';
import userProfile from './sessionsReducer';
import fetchRestaurants from './fetchRestaurantsReducer';
import favorite from './favoriteReducer';

const rootReducer = combineReducers({
  userProfile,
  selectedMovie,
  fetchMovies,
  discovery,
  fetchWeather,
  fetchRestaurants,
  favorite,
  toastr: toastrReducer
});
export default rootReducer;
