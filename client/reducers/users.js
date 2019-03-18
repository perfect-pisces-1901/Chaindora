import axios from "axios";

//Initial State
const initialState = {
  user: {}
};

//Action types
const GET_USER = "GET_USER";

//Action creators
const getUser = user => ({ type: GET_USER, user });

export const getMe = () => dispatch => {
  return axios
    .get("/auth/me")
    .then(res => res.data)
    .then(user => dispatch(getUser(user)))
    .catch(console.error.bind(console));
};

export const login = formData => dispatch => {
  return axios
    .post("/auth/login", formData)
    .then(res => res.data)
    .then(user => dispatch(getUser(user)))
    .catch(console.error.bind(console));
};

export const logout = () => dispatch => {
  return axios
    .delete("/auth/logout")
    .then(() => dispatch(getUser(initialState.user)))
    .catch(console.error.bind(console));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};
