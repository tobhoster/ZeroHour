import {
  FETCH_LOCATION,
  GEOPOSITION_SEARCH,
  GET_LOCATION_KEY,
  GET_TEMPERATURE
} from '../actions/consts';

export default function fetchWeather(
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
