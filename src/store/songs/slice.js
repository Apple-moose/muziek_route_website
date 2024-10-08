import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songList: [
    {
      id: "1",
      title: "Ain't no Sunshine",
      artist: "Bill Withers",
      doc: "aint_no_sunshine",
    },
    {
      id: "2",
      title: "Ain't nobody",
      artist: "Shaka Khan",
      doc: "aint_nobody",
    },
    { id: "3", title: "All of me", artist: "John Legend", doc: "all_of_me" },
    {
      id: "4",
      title: "Als ze er niet is",
      artist: "de Dijk",
      doc: "als_ze_er",
    },
    {
      id: "5",
      title: "Anders Anders",
      artist: "Herman van Veen",
      doc: "anders",
    },
    {
      id: "6",
      title: "Een Beetje Verliefd",
      artist: "Andre Hazes",
      doc: "beetje_verliefd",
    },
    {
      id: "7",
      title: "Blauwe Dag",
      artist: "Suzan & Freek",
      doc: "blauwe_dag",
    },
    {
      id: "8",
      title: "The Book Of Love",
      artist: "Peter Gabriel",
      doc: "book_of_love",
    },
    {
      id: "9",
      title: "the Cup Song",
      artist: "Anna Kendrick",
      doc: "cup_song",
    },
    {
      id: "10",
      title: "Dates in Pickup Trucks",
      artist: "Kassi Ashton",
      doc: "dates_in_pickup",
    },
    {
      id: "11",
      title: "Don't Know Why",
      artist: "Norah Jones",
      doc: "dont_know_why",
    },
    { id: "12", title: "Dreams", artist: "Fleetwood Mac", doc: "dreams" },
    { id: "13", title: "Flowers", artist: "Miley Cyrus", doc: "flowers" },
    {
      id: "14",
      title: "Can't help Falling in Love",
      artist: "Elvis Presley",
      doc: "cant_help",
    },
    { id: "15", title: "Believe", artist: "Cher", doc: "believe" },
    {
      id: "16",
      title: "Besame Mucho",
      artist: "Consuelo Velasquez",
      doc: "besame",
    },
    { id: "17", title: "Feel", artist: "Robbie Williams", doc: "feel" },
    {
      id: "18",
      title: "Fly me to the Moon",
      artist: "Bart Howard",
      doc: "fly_me",
    },
    {
      id: "19",
      title: "Hallelujah",
      artist: "Leonard Cohen",
      doc: "hallelujah",
    },
    {
      id: "20",
      title: "Het is een nacht",
      artist: "Guus Meeuwis",
      doc: "het_is_een",
    },
    {
      id: "21",
      title: "Hopelessly Devoted to You",
      artist: "Grease",
      doc: "hopelessly",
    },
    {
      id: "22",
      title: "How Deep is your Love",
      artist: "Bee-Gees",
      doc: "how_deep",
    },
    {
      id: "23",
      title: "How would you feel",
      artist: "Krezip",
      doc: "how_would_you",
    },
    { id: "24", title: "I'm Yours", artist: "Jason Mraz", doc: "im_yours" },
    {
      id: "25",
      title: "Just the Two of Us",
      artist: "Bill Withers",
      doc: "just_the_two",
    },
    { id: "26", title: "Kiss Me", artist: "SixSpence", doc: "kiss_me" },
    {
      id: "27",
      title: "La Vie en Rose",
      artist: "Edith Piaf",
      doc: "vie_en_rose",
    },
    {
      id: "28",
      title: "Let me Love you",
      artist: "Justin Bieber & Dj Snake",
      doc: "let_me_love",
    },
    {
      id: "29",
      title: "Let's Stay Together",
      artist: "Al Green",
      doc: "lets_stay",
    },
    { id: "30", title: "Love Fool", artist: "The Cardigans", doc: "love_fool" },
    {
      id: "31",
      title: "Love you More",
      artist: "Racoons",
      doc: "love_you_more",
    },
    {
      id: "32",
      title: "Lovely Day",
      artist: "Bill Withers",
      doc: "lovely_day",
    },
    { id: "33", title: "LoveSong", artist: "TheCure", doc: "lovesong" },
    {
      id: "34",
      title: "Mag Ik Dan Bij Jouw",
      artist: "Claudia de Breij",
      doc: "mag_ik_dan",
    },
    {
      id: "35",
      title: "Make you Feel my Love",
      artist: "Adele",
      doc: "make_you_feel",
    },
    {
      id: "36",
      title: "More than Words",
      artist: "Extreme",
      doc: "more_than_words",
    },
    {
      id: "37",
      title: "Need you Now",
      artist: "Lady Antebellum",
      doc: "need_you_now",
    },
    {
      id: "38",
      title: "Non, Je Ne Regrette Rien",
      artist: "Edith Piaf",
      doc: "non_je_ne_regrette",
    },
    { id: "39", title: "Omarm", artist: "Blof", doc: "omarm" },
    {
      id: "40",
      title: "Roller Coaster",
      artist: "Danny Vera",
      doc: "rollercoaster",
    },
    {
      id: "41",
      title: "Heb het Leven Lief (Savoir Aimer)",
      artist: "Pascal Obispo",
      doc: "savoir_aimer",
    },
    { id: "42", title: "Sunrise", artist: "Norah Jones", doc: "sunrise" },
    { id: "43", title: "This Love", artist: "Maroon 5", doc: "this_love" },
    { id: "44", title: "This Town", artist: "Niall Horan", doc: "this_town" },
    {
      id: "45",
      title: "Time After Time",
      artist: "Cindy Lauper",
      doc: "time_after_time",
    },
    { id: "46", title: "Torn", artist: "Natalie Imbruglia", doc: "torn" },
    {
      id: "47",
      title: "What a Wonderful World",
      artist: "Sam Cooke",
      doc: "what_a_wonderful",
    },
    {
      id: "48",
      title: "Wicked Games",
      artist: "Chris Isaak",
      doc: "wicked_games",
    },
    {
      id: "49",
      title: "You Can't Hurry Love",
      artist: "The Supremes",
      doc: "cant_hurry_love",
    },
    {
      id: "50",
      title: "You Got a Friend",
      artist: "Carol King",
      doc: "you_got_a",
    },
    { id: "51", title: "Your Song", artist: "Elton John", doc: "your_song" },
    {
      id: "52",
      title: "Please Please Please",
      artist: "Sabrina Carpenter",
      doc: "please",
    },
    {
      id: "53",
      title: "Con te Partiro (Time to say Goodbye)",
      artist: "Bocelli-Brightman",
      doc: "con_te_partiro",
    },
    {
      id: "54",
      title: "Teardrop",
      artist: "Massive Attack",
      doc: "teardrop",
    },
  ],
};

const songListSlice = createSlice({
  name: "songList",
  initialState,
  reducers: {
    resetSongListData: (state) => {
      state.songList = [];
      //LocalStorage function______________________________
      localStorage.setItem("songListData", JSON.stringify(state.songList));
    },
    addSong: (state, action) => {
      const songId = action.payload;
      const idArray = state.songList.map((i) => {
        return i.id;
      });

      idArray.includes(songId)
        ? (state.songList = state.songList.map((song) => {
            if (song.id === songId) {
              return {
                ...song,
                id: songId,
              };
            } else {
              return { ...song };
            }
          }))
        : state.songList.push({
            id: songId,
          });
      //LocalStorage function______________________________
      localStorage.setItem("songData", JSON.stringify(state.songList));
    },
  },
});

export const { addsong, resetSongListData } = songListSlice.actions;

export default songListSlice.reducer;
