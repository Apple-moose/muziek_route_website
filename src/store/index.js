import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./favorites/slice";
import songListReducer from "./songs/slice";
import authReducer from "./auth/slice";

const store = configureStore({
  reducer: {
    fav: favReducer,
    songList: songListReducer,
    auth: authReducer,
  },
});

export default store;
