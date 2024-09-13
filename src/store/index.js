
import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./favorites/slice";

const store = configureStore({
  reducer: {
    fav: favReducer,
  },
});

export default store;
