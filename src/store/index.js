import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./favorites/slice";
import songListReducer from "./songs/slice";

const store = configureStore({
  reducer: {
    fav: favReducer,
    songList: songListReducer,
  },
});

export default store;
