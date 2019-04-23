import {
  DISCOVER_MOVIES,
  MOVIE_GENRES,
  MOVIE_DETAIL,
  GET_MOVIE_REQUEST,
  MOVIE_RECOMMENDATIONS,
  MOVIES_CASTS,
  GET_IMDB_INFO,
  MOVIE_REVIEWS
} from '../actions/consts';

export default function discovery(
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
