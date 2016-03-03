import { CALL_API, Schemas } from '../middleware/api'
import { stringify } from "qs"
import { intersection } from "lodash"

// POSTS

export const POSTS_REQUEST = 'POSTS_REQUEST'
export const POSTS_SUCCESS = 'POSTS_SUCCESS'
export const POSTS_FAILURE = 'POSTS_FAILURE'

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
  console.log("loadPosts");
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

function fetchChannels(authenticated) {
  return {
    [CALL_API]: {
      types: [ CHANNELS_REQUEST, CHANNELS_SUCCESS, CHANNELS_FAILURE ],
      endpoint: "/channels",
      schema: Schemas.CHANNELS,
      authenticated: authenticated
    }
  }
}

// Fetches channels from API TODO: unless all required fields cached

export function loadChannels(){
  return (dispatch, getState) => {

    return dispatch(fetchChannels(getState().auth.isAuthenticated))
  }
}

// Switch to channel

export function changeToChannel(channelId) {
  return {
    type: CHANGE_CHANNEL,
    channel: channelId
  }
}

// AUTHENTICATION

// There are two possible states for our login
// process and we need actions for each of them.
//
// We also need one to show the Lock widget.
export const SHOW_LOCK = 'SHOW_LOCK'
export const LOCK_SUCCESS = 'LOCK_SUCCESS'
export const LOCK_ERROR = 'LOCK_ERROR'

function showLock() {
  return {
    type: SHOW_LOCK
  }
}

function lockSuccess(profile, token) {
  return {
    type: LOCK_SUCCESS,
    profile,
    token
  }
}

function lockError(err) {
  return {
    type: LOCK_ERROR,
    err
  }
}

// Opens the Lock widget and
// dispatches actions along the way
export function login() {
  const lock = new Auth0Lock('nmkgcfijx8LiICEIhfUL2Q12UcEIEFHx', 'jsm.auth0.com');
  return dispatch => {
    lock.show((err, profile, token) => {
      if(err) {
        dispatch(lockError(err))
        return
      }
      localStorage.setItem('profile', JSON.stringify(profile))
      localStorage.setItem('id_token', token)
      dispatch(lockSuccess(profile, token))
    })
  }
}
