import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_FAVORITE_SHOWS = 'GET_FAVORITE_SHOWS';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

/**
 * ACTION CREATORS
 */

const getFavoriteShows = (favorites) => {
  return {
    type: GET_FAVORITE_SHOWS,
    favorites
  }
}

const removeFavorite = (favorites) => {
  return {
    type: REMOVE_FAVORITE,
    favorites
  }
}

/**
 * THUNK CREATORS
 */

export const fetchFavoriteShows = (id) => {
  return async (dispatch) => {
    const {data} = await axios.get(`http://localhost:8080/api/shows/favorites/${id}`);
    dispatch(getFavoriteShows(data));
  }
}

export const deleteFavorite = (userId, showId) => {
  return async (dispatch) => {
    const {data} = await axios.put(`http://localhost:8080/api/shows/${userId}/${showId}/remove`);
    dispatch(removeFavorite(data));
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_FAVORITE_SHOWS:
      return action.favorites;
    case REMOVE_FAVORITE:
      return action.favorites;
    default:
      return state
  }
}
