import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  TOGGLE_FAVORITE,
  GET_FAVORITES,
  REQUIRE_FAVORITE_STATE
} from '../actions/consts';

export default function favorite(
  state = {
    updated: false,
    isFetching: true,
    didInvalidate: false,
    status: false,
    favorites: []
  },
  action
) {
  switch (action.type) {
    case GET_FAVORITES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        favorites: action.results
      });
    case ADD_FAVORITE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        id: action.id,
        favoriteType: action.favoriteType
      });
    case REMOVE_FAVORITE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        id: action.id
      });
    case TOGGLE_FAVORITE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        id: action.id,
        status: action.status
      });
    case REQUIRE_FAVORITE_STATE:
      return Object.assign({}, state, {
        updated: true
      });
    default:
      return state;
  }
}
