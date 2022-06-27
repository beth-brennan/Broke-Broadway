import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const SET_UNSECURE_AUTH = 'SET_UNSECURE_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
const setUnsecureAuth = auth => ({type: SET_UNSECURE_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = AsyncStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('http://localhost:8080/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (email, password, method) => async dispatch => {
  try {
    const res = await axios.post(`http://localhost:8080/auth/${method}`, {email, password})
    AsyncStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
    const navigation = useNavigation();
    navigation.navigate('All Shows');
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  AsyncStorage.removeItem(TOKEN)
  const navigation = useNavigation();
  navigation.navigate('LoginScreen');
  return {
    type: SET_AUTH,
    auth: {}
  }
}

export const unsecureLogin = (email, password) => async dispatch => {
  const {data} = await axios.get('http://localhost:8080/auth/unsecurelogin', {email, password});
  dispatch(setUnsecureAuth(data));
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case SET_UNSECURE_AUTH:
      return action.auth
    default:
      return state
  }
}
