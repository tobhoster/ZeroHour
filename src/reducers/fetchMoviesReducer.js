import {
  QUERY_MOVIES,
  RECEIVE_MOVIES_QUERY,
  TRENDING_MOVIES,
  NOW_PLAYING_MOVIES,
  POPULAR_MOVIES,
  TOP_RATED_MOVIES,
  UPCOMING_MOVIES
} from '../actions/consts';

export default function fetchMovies(
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
