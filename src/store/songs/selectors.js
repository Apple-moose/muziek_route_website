import { createSelector } from "reselect";

export const selectSongList = (reduxState) => reduxState.songList.songList;

export const selectSongs = selectSongList;

// Memoized
export const selectSongsByTitle = createSelector([selectSongs], (songs) => {
  const alphaArray = [...songs];
  return alphaArray.sort((a, b) => a.title.localeCompare(b.title));
});

// Memoized
export const selectSongsByArtist = createSelector([selectSongs], (songs) => {
  const alphaArray = [...songs];
  return alphaArray.sort((a, b) => a.artist.localeCompare(b.artist));
});
