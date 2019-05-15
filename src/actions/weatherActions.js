import axios from 'axios';

import {
  FETCH_LOCATION,
  GEOPOSITION_SEARCH,
  GET_LOCATION_KEY,
  GET_TEMPERATURE
} from './consts';

function fetchLocation(location) {
  return {
    type: FETCH_LOCATION,
    location
  };
}

function fetchLocationUsingGeolocation(latitude, longitude) {
  return {
    type: GEOPOSITION_SEARCH,
    latitude,
    longitude
  };
}

function getLocationKey(location, result) {
  return {
    type: GET_LOCATION_KEY,
    location,
    result
  };
}

function getTemperature(temperature) {
  return {
    type: GET_TEMPERATURE,
    temperature
  };
}

export function fetchLocationKey(location) {
  return dispatch => {
    dispatch(fetchLocation(location));
    return axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/search?apikey=${
          process.env.REACT_APP_WEATHER_API_KEY
        }&q=${location}`
      )
      .then(response => response.data)
      .then(result => dispatch(getLocationKey(location, result)));
  };
}

// Fetch Weather Condition using Geolocation
export function fetchWeatherConditionUsingGeoLocation(latitude, longitude) {
  return dispatch => {
    dispatch(fetchLocationUsingGeolocation(latitude, longitude));
    return axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${
          process.env.REACT_APP_WEATHER_API_KEY
        }&q=${latitude},${longitude}`
      )
      .then(response => {
        return axios
          .get(
            `http://dataservice.accuweather.com/currentconditions/v1/${
              response.data.Key
            }?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`
          )
          .then(response => {
            return response.data[0].Temperature;
          })
          .then(temperature => dispatch(getTemperature(temperature)));
      });
  };
}

// Fetch Weather Condition using Location
export function fetchWeatherConditionUsingLocation(location) {
  return dispatch => {
    dispatch(fetchLocation(location));
    return axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/search?apikey=${
          process.env.REACT_APP_WEATHER_API_KEY
        }&q=${location}`
      )
      .then(response => {
        return dispatch => {
          dispatch(fetchLocation(location));
          return axios
            .get(
              `http://dataservice.accuweather.com/currentconditions/v1/${
                response.data.Key
              }apikey=${process.env.REACT_APP_WEATHER_API_KEY}`
            )
            .then(response => response.data.Temperature)
            .then(temperature => dispatch(getTemperature(temperature)));
        };
      });
  };
}
