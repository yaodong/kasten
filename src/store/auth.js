import firebase from 'firebase/app';
import firebaseService from '../services/firebase';

export const AuthActions = {
  SIGN_IN: 'AUTH_SIGN_IN',
  SIGN_OUT: 'AUTH_SIGN_OUT',
  CHANGED: 'AUTH_CHANGED',
};

export function observeAuthAction(dispatch) {
  firebaseService.auth().onAuthStateChanged(result => {
    const auth = result
      ? {
        isUser: true,
        isGuest: false,
        userId: result.uid,
        displayName: result.displayName
      }
      : {
        isUser: false,
        isGuest: true
      };
    dispatch({ type: AuthActions.CHANGED, auth });
  });
};

export function authReducer(state = {}, action) {
  switch (action.type) {
    case AuthActions.CHANGED:
      const { auth } = action;
      if (auth.isGuest) {
        localStorage.removeItem('auth');
      }
      return auth;
    default:
      return { ...state };
  }
}

export function authMiddleware() {
  return next => async action => {
    switch (action.type) {
      case AuthActions.SIGN_IN:
        await signInUser();
        break;
      case AuthActions.SIGN_OUT:
        await signOutUser();
        break;
      default:
    }
    return next(action)
  }
}


const authProvider = new firebase.auth.GoogleAuthProvider();

const signInUser = async () => {
  await firebaseService.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebaseService.auth().signInWithPopup(authProvider);
};

const signOutUser = async () => {
  await firebaseService.auth().signOut();
}
