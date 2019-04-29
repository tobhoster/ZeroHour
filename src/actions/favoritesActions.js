import firebase, { favoritesRef } from '../utils/firebase';
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  TOGGLE_FAVORITE,
  REQUIRE_FAVORITE_STATE
} from './consts';
import { isNullOrUndefined } from 'util';

const addToFavorite = (id, favoriteType) => ({
  type: ADD_FAVORITE,
  id,
  favoriteType
});

const removeFavorite = id => ({
  type: REMOVE_FAVORITE,
  id
});

const toggleFavorite = (id, status) => ({
  type: TOGGLE_FAVORITE,
  id,
  status
});

export function setFavoriteState() {
  return {
    type: REQUIRE_FAVORITE_STATE
  };
}

export function getFavorite(id) {
  return dispatch => {
    return favoritesRef
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          dispatch(toggleFavorite(id, true));
        } else {
          dispatch(toggleFavorite(id, false));
        }
      })
      .catch(err => {
        dispatch(toggleFavorite(id, false));
      });
  };
}

export function addFavorite(id, type, history) {
  return dispatch => {
    const currentUser = firebase.auth().currentUser;

    if (isNullOrUndefined(currentUser)) {
      return history.push(`/login`);
    }

    return favoritesRef
      .doc(id)
      .set({
        uid: currentUser.uid.toString(),
        type,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        dispatch(addToFavorite(id, type));
      })
      .then(() => {
        dispatch(setFavoriteState());
      });
  };
}

export function deleteFavorite(id) {
  return dispatch => {
    return favoritesRef
      .doc(id)
      .delete()
      .then(() => {
        dispatch(removeFavorite(id));
      })
      .then(() => {
        dispatch(setFavoriteState());
      });
  };
}
