import axios from "axios";
import { setUserId, setUsername } from "./slice";

//Local URL------>
// const API_URL = `http://localhost:8000`;

//Web URL------>
const API_URL = `https://muziek-route-api.onrender.com`;

//LOGIN for USERS--------------------->
export const loginUser = (username, show_no) => {
  return async function thunk(dispatch) {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username: username,
        show_no: show_no,
      });
      dispatch(setUserId(response.data.id));
      dispatch(setUsername(response.data.username));
      return response.data;
    } catch (err) {
      console.error("Error login in!", err);
    }
  };
};

export const removeUser = (id) => {
  return async function thunk() {
    try {
      const response = await axios.delete(API_URL + `/signup/${id}`);
      return response;
    } catch (err) {
      console.log("Error sending delete request", err);
      throw err;
    }
  };
};

//VOTE FUNCTIONS------------------>
export const sendLike = (userId, songId) => {
  return async function thunk() {
    try {
      const response = await axios.post(`${API_URL}/like`, {
        user_id: userId,
        song_id: songId,
      });
      return response.data;
    } catch (err) {
      console.error("Error in sending likes", err);
    }
  };
};

export const sendHate = (userId, songId) => {
  return async function thunk() {
    try {
      const response = await axios.post(`${API_URL}/dislike`, {
        user_id: userId,
        song_id: songId,
      });
      return response.data;
    } catch (err) {
      console.error("Error in sending hates", err);
    }
  };
};

export const resetVotes = (id) => {
  return async function thunk() {
    try {
      const response = await axios.delete(API_URL + `/reset/${id}`);
      return response;
    } catch (err) {
      console.log("Error sending reset request", err);
      throw err;
    }
  };
};

// export const writeReview = (prodId, author, stars, content) => {
//   return async function thunk() {
//     const tokenFromStorage = localStorage.getItem("tokenReceived");

//     try {
//       const response = await axios.post(
//         API_URL + `/review/${prodId}`,
//         {
//           author: author,
//           content: content,
//           stars: stars,
//         },
//         {
//           headers: { Authorization: `Bearer ${tokenFromStorage} ` },
//         }
//       );
//       console.log(response.data);
//       return response.data;
//     } catch (err) {
//       console.log("User Login Error", err);
//     }
//   };
// };

// export const deleteReview = (id) => {
//   return async function thunk() {
//     const tokenFromStorage = localStorage.getItem("tokenReceived");
//     axios
//       .delete(API_URL + `/review/${id}`, {
//         headers: { Authorization: `Bearer ${tokenFromStorage} ` },
//       })
//       .catch((err) => console.log("error sending delete request", err));
//   };
// };

// export const fetchReviewsByProdId = (prodId) => {
//   return async (dispatch) => {
//     try {
//       dispatch(startLoading());
//       const response = await axios.get(
//         `${API_URL}/reviews/productId:${prodId}`
//       );
//       const reviews = response.data;
//       dispatch(reviewsFetched(reviews));
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
// };

// export const fetchMyReviews = () => {
//   return async (dispatch) => {
//     const tokenFromStorage = localStorage.getItem("tokenReceived");
//     axios
//       .get(API_URL + "/reviews/me", {
//         headers: { Authorization: `Bearer ${tokenFromStorage} ` },
//       })
//       .then((data) => {
//         dispatch(startLoading());
//         dispatch(reviewsFetched(data.data));
//       })
//       .catch((err) => console.log("err", err));
//   };
// };
