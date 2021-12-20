import axios from 'axios';
import { returnErrors, returnErros } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

//Check token and load user
const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErros(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//Setup config/headers and token
export const tokenConfig = (getState) => {
  //Get token from localStorage
  const token = getState().auth.token;
  //Header
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  //If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};

export default loadUser;
