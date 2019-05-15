import firebase, {
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

function getUserState(user, loggedIn) {
  return {
    type: LOGIN_STATE,
    user,
    loggedIn
  };
}

export const loginState = () => dispatch => {
  try {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userData = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        };
        dispatch(getUserState(userData, true));
      } else {
        dispatch(getUserState(user, false));
      }
    });
  } catch (error) {
    toastr.error(error);
  }
};

export const createUser = (username, email, password) => dispatch => {
  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return usersRef
          .doc(authUser.user.uid)
          .set({
            displayName: username,
            email: authUser.user.email,
            uid: authUser.user.uid,
            createdAt: Date.now()
          })
          .then(() => {
            return firebase.auth().currentUser.updateProfile({
              displayName: username
            });
          })
          .then(() => {
            return loginUser(email, password);
          });
      })
      .catch(err => {
        alert(err);
      });
  } catch (error) {
    toastr.error(error);
  }
};

export const loginUser = (email, password) => dispatch => {
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(authUser => {
        return usersRef
          .doc(authUser.user.uid)
          .get()
          .then(userData => {
            if (userData.exists) {
              dispatch(getUser(authUser, userData.data));
            } else {
              usersRef.doc(authUser.user.uid).set({
                displayName: authUser.user.displayName,
                email: authUser.user.email,
                uid: authUser.user.uid,
                createdAt: Date.now()
              });
            }
          });
      })
      .catch(err => {
        alert(err);
      });
  } catch (error) {
    toastr.error(error);
  }
};

export function loginGoogle() {
  return dispatch => {
    try {
      return firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(result => {
          // var token = result.credential.providerId;
          var user = result.user;

          return usersRef
            .doc(user.uid)
            .get()
            .then(userData => {
              if (userData.exists) {
                dispatch(getUser(result, userData.data));
              } else {
                usersRef.doc(user.uid).set({
                  displayName: user.displayName,
                  email: user.email,
                  uid: user.uid,
                  createdAt: Date.now()
                });
              }
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
      return firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then(result => {
          // var token = result.credential.providerId;
          var user = result.user;

          return usersRef
            .doc(user.uid)
            .get()
            .then(userData => {
              if (userData.exists) {
                dispatch(getUser(result, userData.data));
              } else {
                usersRef.doc(user.uid).set({
                  displayName: user.displayName,
                  email: user.email,
                  uid: user.uid,
                  createdAt: Date.now()
                });
              }
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
      return firebase
        .auth()
        .signInWithPopup(twitterProvider)
        .then(result => {
          // var token = result.credential.providerId;
          var user = result.user;

          return usersRef
            .doc(user.uid)
            .get()
            .then(userData => {
              if (userData.exists) {
                dispatch(getUser(result, userData.data));
              } else {
                usersRef.doc(user.uid).set({
                  displayName: user.displayName,
                  email: user.email,
                  uid: user.uid,
                  createdAt: Date.now()
                });
              }
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
      return firebase
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
