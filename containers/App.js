import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { changeToChannel, loadChannels, loadPosts, selectPost } from "../actions"
import Tuner from "../components/Tuner"
import Posts from "../components/Posts"
import { intersection } from "lodash"

function loadData(props) {
  const {} = props
  props.loadChannels()
}

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    // If currentChannel not set and not incoming select first channel
    if (!this.props.currentChannel && !nextProps.currentChannel && (nextProps.channels.length > 1)) { // maybe some of this to loadChannels
      this.props.changeToChannel(nextProps.channels[0].id)
    }
    console.log("this.props: ", this.props);
    console.log("nextProps: ", nextProps);
    if (!this.props.currentChannelTags && nextProps.currentChannelTags){
      this.props.loadPosts(nextProps.currentChannelTags)
    }

  }

  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange(nextValue) {

    this.props.changeToChannel(nextValue)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
          onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    const { children, currentChannel, channels, currentPostsArray } = this.props
    console.log("CurPostsAr: ", currentPostsArray);
    return (
      <div>
        {this.renderErrorMessage()}
        <Tuner
          currentChannnel={currentChannel}
          channels={channels}
          onChange={this.handleChange}
        />
        <Posts
          channel={currentChannel}
          posts={currentPostsArray}
        />
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  // errorMessage: PropTypes.string,
  // resetErrorMessage: PropTypes.func,
  currentChannel: PropTypes.string,
  channels: PropTypes.array,
  currentChannelTags: PropTypes.array,
  currentPostsArray: PropTypes.array,
  changeToChannel: PropTypes.func,
  loadChannels: PropTypes.func,
  // Injected by React Router
  children: PropTypes.node
}


function mapStateToProps(state) {  // Optional second argument of props
  const { entities, current } = state
  const { posts, tags, channels } = entities
  const channelsArray = Object.keys(channels).map(id => channels[id])
  const currentChannel = current.channel
  const currentChannelTags = currentChannel ? channels[currentChannel].tags : null
  const currentPostsArray = Object.keys(posts)
    .map(id => posts[id])
    .filter(post => intersection(post.tags, currentChannelTags).length > 0) //Relevant tag logic here

  return {posts, tags, channels: channelsArray, currentChannel, currentChannelTags, currentPostsArray }
}


export default connect(mapStateToProps, {loadChannels, loadPosts, changeToChannel, selectPost})(App)
