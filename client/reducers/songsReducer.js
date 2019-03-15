import axios from 'axios';

const GET_SONGS = 'GET_SONGS';

const gotSongs = songs => ({
  type: GET_SONGS,
  songs,
});

export const getSongs = () => {
  return async dispatch => {
    const response = await axios.get('/api/songs');
    const songs = response.data;
    dispatch(gotSongs(songs));
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS:
      return action.songs;
    default:
      return state;
  }
};
