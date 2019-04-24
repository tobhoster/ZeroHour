import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import selectedMovie from './selectedMovieReducer';
import fetchMovies from './fetchMoviesReducer';
import discovery from './discoveryReducer';
import fetchWeather from './fetchWeatherReducer';
import userProfile from './sessionsReducer';

const rootReducer = combineReducers({
  userProfile,
  selectedMovie,
  fetchMovies,
  discovery,
  fetchWeather,
  toastr: toastrReducer
});
export default rootReducer;
