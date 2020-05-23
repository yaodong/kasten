import { createStore, combineReducers, applyMiddleware } from 'redux';
import { authReducer, authMiddleware, observeAuthAction } from './auth';

const rootReducer = combineReducers({
  auth: authReducer
});

const initialState = {
  auth: {
    isUser: false,
    isGuest: true
  }
}

function restoreAuth() {
  try {
    const localAuth = localStorage.getItem('auth');
    return localAuth ? JSON.parse(localAuth) : null;
  } catch (e) {
    return null
  }
}

export function configureStore() {
  const auth = restoreAuth();
  const restoredState = auth ? { ...initialState, auth } : initialState;

  const store = createStore(
    rootReducer,
    restoredState,
    applyMiddleware(
      authMiddleware
    )
  );

  observeAuthAction(store.dispatch)

  return store;
}

