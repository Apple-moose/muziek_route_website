import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favArray: [
    // form is: { id: 0, like: 0, dislike: 0 color: ""},
  ],
  userId: null,
  username: null,
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      //LocalStorage function______________________________
      localStorage.setItem("muziekRoute_userId", JSON.stringify(state.userId));
    },
    setUsername: (state, action) => {
      state.username = action.payload;
      //LocalStorage function______________________________
      localStorage.setItem("muziekRoute_username", state.username);
    },
    resetFavData: (state) => {
      state.favArray = [];
      //LocalStorage function______________________________
      localStorage.removeItem("muziekRoute_favData");
    },
    resetUserLoginData: (state, action) => {
      state.userId = null;
      state.username = null;
      //LocalStorage function______________________________
      localStorage.removeItem("muziekRoute_userId");
      localStorage.removeItem("muziekRoute_username");
    },
    addFav: (state, action) => {
      const songId = action.payload;
      const idArray = state.favArray.map((i) => {
        return i.id;
      });

      idArray.includes(songId)
        ? (state.favArray = state.favArray.map((fav) => {
            if (fav.id === songId) {
              return {
                ...fav,
                id: songId,
                like: 1,
                dislike: 0,
                color: "success",
              };
            } else {
              return { ...fav };
            }
          }))
        : state.favArray.push({
            id: songId,
            like: 1,
            dislike: 0,
            color: "success",
          });
      //LocalStorage function______________________________
      localStorage.setItem(
        "muziekRoute_favData",
        JSON.stringify(state.favArray)
      );
    },
    dislikeFav: (state, action) => {
      const songId = action.payload;
      const idArray = state.favArray.map((i) => {
        return i.id;
      });

      idArray.includes(songId)
        ? (state.favArray = state.favArray.map((fav) => {
            if (fav.id === songId) {
              return {
                ...fav,
                id: songId,
                like: 0,
                dislike: 1,
                color: "danger",
              };
            } else {
              return { ...fav };
            }
          }))
        : state.favArray.push({
            id: songId,
            like: 0,
            dislike: 1,
            color: "danger",
          });
      //LocalStorage function______________________________
      localStorage.setItem(
        "muziekRoute_favData",
        JSON.stringify(state.favArray)
      );
    },
    resetFav: (state, action) => {
      const songId = action.payload;
      const idArray = state.favArray.map((i) => {
        return i.id;
      });

      idArray.includes(songId)
        ? (state.favArray = state.favArray.map((fav) => {
            if (fav.id === songId) {
              return { ...fav, like: 0, dislike: 0, color: "secondary" };
            } else {
              return { ...fav };
            }
          }))
        : state.favArray.push({
            id: songId,
            like: 0,
            dislike: 0,
            color: "secondary",
          });
      //LocalStorage function______________________________
      localStorage.setItem(
        "muziekRoute_favData",
        JSON.stringify(state.favArray)
      );
    },
    bootstrapUser: (state) => {
      const firstArray = state.favArray;
      !localStorage.muziekRoute_favData
        ? (state.favArray = firstArray)
        : (state.favArray = JSON.parse(
            localStorage.getItem("muziekRoute_favData")
          ));
      !localStorage.muziekRoute_userId
        ? (state.userId = null)
        : (state.userId = JSON.parse(
            localStorage.getItem("muziekRoute_userId")
          ));
      !localStorage.muziekRoute_username
        ? (state.username = null)
        : (state.username = localStorage.getItem("muziekRoute_username"));
    },
  },
});

export const {
  addFav,
  dislikeFav,
  resetFav,
  resetFavData,
  resetUserLoginData,
  bootstrapUser,
  setUserId,
  setUsername,
} = favSlice.actions;

export default favSlice.reducer;
