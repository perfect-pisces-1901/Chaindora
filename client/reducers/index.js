import { combineReducers } from "redux";
import songs from "./songsReducer";
import users from "./users";

export default combineReducers({
  songs,
  users
});
