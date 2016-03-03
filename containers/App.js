import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { changeToChannel, loadChannels, loadPosts, selectPost } from "../actions"
import Tuner from "../containers/Tuner"
import Channel from "../components/ChannelViewer"
import { intersection } from "lodash"


export default class App extends Component {
  constructor(props) {
    super(props)
  }


  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
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
    const { Tuner, Channel } = this.props
    return (
      <div>
        {this.renderErrorMessage()}
        {Tuner}
        {Channel}
      </div>
    )
  }
}

App.propTypes = {
  // // Injected by React Redux
  // // errorMessage: PropTypes.string,
  // // resetErrorMessage: PropTypes.func,
  // currentChannel: PropTypes.string,
  // channels: PropTypes.array,
  // currentChannelTags: PropTypes.array,
  // currentPostsArray: PropTypes.array,
  // changeToChannel: PropTypes.func,
  // loadChannels: PropTypes.func,
  // Injected by React Router
  children: PropTypes.node
}


function mapStateToProps(state) {  // Optional second argument of props
  // const { entities, current } = state
  // const { posts, tags, channels } = entities
  // const channelsArray = Object.keys(channels).map(id => channels[id])
  // const currentChannelTags = currentChannel ? channels[currentChannel].tags : null
  // const currentPostsArray = Object.keys(posts)
  //   .map(id => posts[id])
  //   .filter(post => intersection(post.tags, currentChannelTags).length > 0) //Relevant tag logic here

  return {}
}


export default connect(mapStateToProps, {loadChannels, loadPosts, changeToChannel, selectPost})(App)
