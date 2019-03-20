import { combineReducers } from 'redux';
import songs from './songsReducer';
import user from './user'

export default combineReducers({
  songs,
  user
});
