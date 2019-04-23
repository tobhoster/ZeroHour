import { combineReducers } from 'redux';
import selectedMovie from './selectedMovieReducer';
import fetchMovies from './fetchMoviesReducer';
import discovery from './discoveryReducer';
import fetchWeather from './fetchWeatherReducer';

const rootReducer = combineReducers({
  selectedMovie,
  fetchMovies,
  discovery,
  fetchWeather
});
export default rootReducer;
