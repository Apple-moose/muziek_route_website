import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favArray: [
    // form is: { id: 0, like: 0, dislike: 0 color: ""},
  ],
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    resetFavData: (state) => {
      state.favArray = [];
      //LocalStorage function______________________________
      localStorage.setItem("favData", JSON.stringify(state.favArray));
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
      localStorage.setItem("favData", JSON.stringify(state.favArray));
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
      localStorage.setItem("favData", JSON.stringify(state.favArray));
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
      localStorage.setItem("favData", JSON.stringify(state.favArray));
    },
    bootstrapUser: (state) => {
      const firstArray = state.favArray;
      !localStorage.favData
        ? (state.favArray = firstArray)
        : (state.favArray = JSON.parse(localStorage.getItem("favData")));
    },
  },
});

export const { addFav, dislikeFav, resetFav, resetFavData, bootstrapUser } =
  favSlice.actions;

export default favSlice.reducer;
