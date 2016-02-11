import { CALL_API, Schemas } from '../middleware/api'
import { stringify } from "qs"
import { intersection } from "lodash"

// POSTS

export const POSTS_REQUEST = 'POST_REQUEST'
export const POSTS_SUCCESS = 'POST_SUCCESS'
export const POSTS_FAILURE = 'POST_FAILURE'

export const SELECT_POST = "SELECT_POST"

// Fetches posts TODO: fetch individual post

function fetchPosts(tagIds) {
  return {
    [CALL_API]: {
      types: [ POSTS_REQUEST, POSTS_SUCCESS, POSTS_FAILURE ],
      endpoint: `/posts?${ stringify({tags: tagIds}) }`,
      schema: Schemas.POSTS
    }
  }
}

// Fetches posts from API unless cached.
// Relies on Redux Thunk middleware.
export function loadPosts(tagIds, requiredFields = []) {
  return (dispatch, getState) => {
    // const user = getState().entities.users[login]
    // if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    //   return null
    // }
    return dispatch(fetchPosts(tagIds))
  }
}

// Select focused post for channel
export function selectPost(postId, channelId) {
  return {
    type: SELECT_POST,
    ids: { postId, channelId }
  }
}



// CHANNELS

export const CHANNELS_REQUEST = "CHANNEL_REQUEST"
export const CHANNELS_SUCCESS = "CHANNEL_SUCCESS"
export const CHANNELS_FAILURE = "CHANNEL_FAILURE"

export const CHANGE_CHANNEL = "CHANGE_CHANNEL"

// Fetches channels

function fetchChannels(channelIds) {
  return {
    [CALL_API]: {
      types: [ CHANNELS_REQUEST, CHANNELS_SUCCESS, CHANNELS_FAILURE ],
      endpoint: "/channels",
      schema: Schemas.CHANNELS
    }
  }
}

// Fetches channels from API TODO: unless all required fields cached

export function loadChannels(channelIds, requiredFields){
  return (dispatch, getState) => {

    return dispatch(fetchChannels(channelIds))
  }
}

// Switch to channel

export function changeToChannel(channelId) {
  return {
    type: CHANGE_CHANNEL,
    channel: channelId
  }
}
