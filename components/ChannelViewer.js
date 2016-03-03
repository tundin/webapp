import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux"
import { loadPosts } from "../actions"
import PostCard from "./PostCard"
import { intersection } from "lodash"

class ChannelViewer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps){
    const { loadPosts, channel } = this.props
    const nextChannel = nextProps.channel
    if (nextChannel !== channel) {
      loadPosts(nextChannel.tags)
    }
  }


  render() {
    const { channel, posts } = this.props
    if (channel && posts) {
      console.log("channel: ", channel);
      return ( <div>
        <h1>{channel.id}</h1>
        <ul>
          { posts.map((post) => (<PostCard key={post.id} post={post} />)) }
        </ul>
      </div>)
    } else {
      return ( <h2>Loading...</h2>)
    }
  }
}

ChannelViewer.propTypes = {
  posts: PropTypes.array,
  channel: PropTypes.object
}

function mapStateToProps(state, props) {
  const { entities, auth } = state
  const {channelId} = props.params
  const channel = entities.channels[channelId]
  const posts = Object.keys(entities.posts)
    .map((postId) => {
      return entities.posts[postId]
    })
  .filter((post) => {
    for (var i = 0; i < channel.tags.length; i += 0) {
      if (post.tags.indexOf(channel.tags[i]) > -1) {
        return true
      }
      return
    }
  })
  return { channel, posts }
}

export default connect(mapStateToProps, { loadPosts })(ChannelViewer)
