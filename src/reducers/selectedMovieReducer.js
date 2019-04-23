import { SELECT_MOVIE } from '../actions/consts';

export default function selectedMovie(state = '', action) {
  switch (action.type) {
    case SELECT_MOVIE:
      console.log('SELECT_MOVIE: ', action);
      return action.movie;
    default:
      return state;
  }
}
