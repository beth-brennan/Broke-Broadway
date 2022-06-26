import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_SHOWS = 'GET_ALL_SHOWS';
const GET_FAVORITE_SHOWS = 'GET_FAVORITE_SHOWS';

/**
 * ACTION CREATORS
 */
const getAllShows = (shows) => {
  return {
    type: GET_ALL_SHOWS,
    shows
  }
}

const getFavoriteShows = (shows) => {
  return {
    type: GET_FAVORITE_SHOWS,
    shows
  }
}

/**
 * THUNK CREATORS
 */
export const fetchAllShows = () => {
  return async (dispatch) => {
    const {data} = await axios.get('http://localhost:8080/api/shows');
    dispatch(getAllShows(data));
  }
}

export const fetchFavoriteShows = (id) => {
  return async (dispatch) => {
    const {data} = await axios.get(`http://localhost:8080/api/users/${id}`);
    dispatch(getFavoriteShows(data));
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_SHOWS:
      return action.shows;
    case GET_FAVORITE_SHOWS:
      return action.shows;
    default:
      return state
  }
}
