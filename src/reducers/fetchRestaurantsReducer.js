import {
  FETCH_RESTAURANTS,
  RECEIVE_RESTAURANTS,
  RECEIVE_SEARCHED_RESTAURANTS,
  RECEIVE_RESTAURANTS_DETAILS,
  RECEIVE_RESTAURANTS_REVIEWS
} from '../actions/consts';

export default function fetchRestaurants(
  state = {
    isFetching: false,
    didInvalidate: false,
    text: '',
    restaurants: [],
    searched: [],
    details: {},
    reviews: []
  },
  action
) {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        text: action.id
      });
    case RECEIVE_RESTAURANTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        restaurants: action.restaurants
      });
    case RECEIVE_SEARCHED_RESTAURANTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        searched: action.restaurants
      });
    case RECEIVE_RESTAURANTS_DETAILS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        id: action.id,
        details: action.details
      });
    case RECEIVE_RESTAURANTS_REVIEWS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        id: action.id,
        reviews: action.reviews
      });
    default:
      return state;
  }
}
