import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_SHOWS = 'GET_ALL_SHOWS';

/**
 * ACTION CREATORS
 */
const getAllShows = (shows) => {
  return {
    type: GET_ALL_SHOWS,
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

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_SHOWS:
      return action.shows;
    default:
      return state
  }
}
