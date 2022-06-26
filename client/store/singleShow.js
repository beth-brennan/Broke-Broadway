import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ONE_SHOW = 'GET_ONE_SHOW';

/**
 * ACTION CREATORS
 */
const getOneShow = (singleShow) => {
  return {
    type: GET_ONE_SHOW,
    singleShow
  }
}

/**
 * THUNK CREATORS
 */
export const fetchOneShow = (id) => {
  return async (dispatch) => {
    const {data} = await axios.get(`http://localhost:8080/api/shows/${id}`);
    dispatch(getOneShow(data));
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_ONE_SHOW:
      return action.singleShow;
    default:
      return state
  }
}
