import * as ActionTypes from '../actions'
import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { merge } from "lodash"

// Updates an entity cache in response to any action with response.entities.
function entities(state = { posts: {}, tags: {}, channels: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// UI state -- selectedChannel, selectedPostByChannel
function current(state = {channel: null, postByChannel: {}}, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_CHANNEL:
      return merge({}, state, {channel: action.channel})
    case ActionTypes.SELECT_POST:
      const { postId, channelId } = action.ids
      const { postByChannel } = state
      return merge({}, state, merge({}, postByChannel, {[channelId]: postId}))
    default:
      return state
  }
}


const rootReducer = combineReducers({
  entities,
  current,
  routing: routeReducer
})


export default rootReducer
