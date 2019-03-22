import { combineReducers } from 'redux';
import songs from './songsReducer';
import user from './userReducer'

export default combineReducers({
  songs,
  user
});
