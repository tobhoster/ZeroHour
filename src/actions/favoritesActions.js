import firebase, { usersRef } from '../utils/firebase';
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  TOGGLE_FAVORITE,
  REQUIRE_FAVORITE_STATE,
  GET_FAVORITES
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

export function getFavorites(results) {
  return {
    type: GET_FAVORITES,
    results
  };
}

export function getFavorite(id) {
  return dispatch => {
    const currentUser = firebase.auth().currentUser;

    if (isNullOrUndefined(currentUser)) {
      console.log('getFavorite: ', false);
      return;
    }

    console.log('getFavorite: ', true);
    const uid = currentUser.uid.toString();
    return usersRef
      .doc(`${uid}/favorites/${id}`)
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

export function addFavorite(id, type, detail, history) {
  return dispatch => {
    const currentUser = firebase.auth().currentUser;

    if (isNullOrUndefined(currentUser)) {
      return history.push(`/login`);
    }

    const uid = currentUser.uid.toString();
    return usersRef
      .doc(`${uid}/favorites/${id}`)
      .set({
        uid,
        type,
        detail,
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

export function deleteFavorite(id, history) {
  return dispatch => {
    const currentUser = firebase.auth().currentUser;

    if (isNullOrUndefined(currentUser)) {
      return history.push(`/login`);
    }

    const uid = currentUser.uid.toString();
    return usersRef
      .doc(`${uid}/favorites/${id}`)
      .delete()
      .then(() => {
        dispatch(removeFavorite(id));
      })
      .then(() => {
        dispatch(setFavoriteState());
      });
  };
}

export function getFavoritesFromDB(history) {
  return dispatch => {
    const currentUser = firebase.auth().currentUser;

    if (isNullOrUndefined(currentUser)) {
      return history.push(`/login`);
    }

    const uid = currentUser.uid.toString();
    return usersRef
      .doc(uid)
      .collection('favorites')
      .orderBy('timestamp', 'desc')
      .get()
      .then(results => {
        let favorites = [];
        results.forEach(doc => {
          favorites.push(doc.data());
        });

        return favorites;
      })
      .then(data => {
        dispatch(getFavorites(data));
      });
  };
}
