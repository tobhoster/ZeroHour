import app, {
  usersRef,
  googleProvider,
  facebookProvider,
  twitterProvider
} from '../utils/firebase';
import { USER_LOGIN, USER_LOGOUT, LOGIN_STATE } from './consts';
import toastr from 'react-redux-toastr';

function getUser(auth, data) {
  return {
    type: USER_LOGIN,
    auth,
    user: data
  };
}

function letLogOut(state) {
  return {
    type: USER_LOGOUT,
    done: state
  };
}

function getUserState(user, state) {
  return {
    type: LOGIN_STATE,
    user,
    state
  };
}

export const loginState = () => dispatch => {
  try {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(getUserState(user, true));
      } else {
        dispatch(getUserState(user, false));
      }
    });
  } catch (error) {
    toastr.error(error);
  }
};

export const loginUser = (email, password) => dispatch => {
  try {
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(authUser => {
        return usersRef
          .doc(authUser.user.uid)
          .get()
          .then(user => {
            dispatch(getUser(authUser, user.data));
          });
      })
      .catch(err => {
        toastr.error(err);
      });
  } catch (error) {
    toastr.error(error);
  }
};

export function loginGoogle() {
  return dispatch => {
    try {
      return app
        .auth()
        .signInWithPopup(googleProvider)
        .then(result => {
          var token = result.credential.providerId;
          var user = result.user;

          return result
            .doc(user.uid)
            .get()
            .then(userData => {
              dispatch(getUser(result, userData.data));
            });
        });
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      toastr.error(`${errorCode} - ${errorMessage} \n${email} ${credential}`);
    }
  };
}

export function loginFacebook() {
  return dispatch => {
    try {
      return app
        .auth()
        .signInWithPopup(facebookProvider)
        .then(result => {
          var token = result.credential.providerId;
          var user = result.user;

          return result
            .doc(user.uid)
            .get()
            .then(userData => {
              dispatch(getUser(result, userData.data));
            });
        });
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      toastr.error(`${errorCode} - ${errorMessage} \n${email} ${credential}`);
    }
  };
}

export function loginTwitter() {
  return dispatch => {
    try {
      return app
        .auth()
        .signInWithPopup(twitterProvider)
        .then(result => {
          var token = result.credential.providerId;
          var user = result.user;

          return result
            .doc(user.uid)
            .get()
            .then(userData => {
              dispatch(getUser(result, userData.data));
            });
        });
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      toastr.error(`${errorCode} - ${errorMessage} \n${email} ${credential}`);
    }
  };
}

export function logOutUser() {
  return dispatch => {
    try {
      return app
        .auth()
        .signOut()
        .then(() => {
          dispatch(letLogOut(true));
        })
        .catch(err => {
          toastr.error(err);
        });
    } catch (err) {
      toastr.error(err);
    }
  };
}
