import * as ActionTypes from '../actions'
import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
function entities(state = { posts: {}, tags: {}, channels: {} }, action) {
  if (action.response && action.response.entities) {
    return Object.assign({}, state, action.response.entities)
  }

  return state
}

// Auth
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
    switch (action.type) {
      case ActionTypes.LOCK_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          errorMessage: ''
        })
      case ActionTypes.LOGOUT_SUCCESS:
        return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: false
        })
      default:
        return state
    }
  }


const rootReducer = combineReducers({
  entities,
  auth,
  routing: routeReducer
})


export default rootReducer
