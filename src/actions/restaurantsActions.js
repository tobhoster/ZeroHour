import axios from 'axios';

import {
  FETCH_RESTAURANTS,
  RECEIVE_RESTAURANTS,
  RECEIVE_SEARCHED_RESTAURANTS,
  RECEIVE_RESTAURANTS_DETAILS,
  RECEIVE_RESTAURANTS_REVIEWS
} from './consts';

const AuthStr = `Bearer ${process.env.REACT_APP_YELP_API_KEY}`;
const headers = {
  headers: {
    Authorization: AuthStr
  }
};

function fetchResturants(id) {
  return {
    type: FETCH_RESTAURANTS,
    id
  };
}

function receiveResturants(restaurants) {
  return {
    type: RECEIVE_RESTAURANTS,
    restaurants
  };
}

function receivedSearchedResturants(text, restaurants) {
  return {
    type: RECEIVE_SEARCHED_RESTAURANTS,
    text,
    restaurants
  };
}

function receiveResturantsDetails(id, details) {
  return {
    type: RECEIVE_RESTAURANTS_DETAILS,
    id,
    details
  };
}

function receiveReviews(id, reviews) {
  return {
    type: RECEIVE_RESTAURANTS_REVIEWS,
    id,
    reviews
  };
}

export function searchResturants(text, latitude, longitude) {
  return dispatch => {
    dispatch(fetchResturants(text));
    return axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${text}&latitude=${latitude}&longitude=${longitude}`,
        headers
      )
      .then(response => response.data.businesses)
      .then(restaurants =>
        dispatch(receivedSearchedResturants(text, restaurants))
      );
  };
}

export function discoverResturants(latitude, longitude) {
  return dispatch => {
    dispatch(fetchResturants(''));
    return axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`,
        headers
      )
      .then(response => response.data.businesses)
      .then(restaurants => dispatch(receiveResturants(restaurants)));
  };
}

export function getResturantDetails(id) {
  return dispatch => {
    dispatch(fetchResturants(id));
    return axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,
        headers
      )
      .then(response => response.data)
      .then(details => dispatch(receiveResturantsDetails(id, details)));
  };
}

export function getResturantReviews(id) {
  return dispatch => {
    dispatch(fetchResturants(id));
    return axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`,
        headers
      )
      .then(response => response.data.reviews)
      .then(reviews => dispatch(receiveReviews(id, reviews)));
  };
}
