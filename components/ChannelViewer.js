import React, { Component, PropTypes } from 'react'
import { connect } from "react-redux"
import { loadPosts } from "../actions"
import ChannelHeader from "./ChannelHeader"
import PostIndex from "./PostIndex"
import { PageHeader, Container, Card, CardImage, Heading } from "rebass"

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
    return (
      <div className="channel-viewer">
        <ChannelHeader channel={channel} />
        <PostIndex posts={posts} />
      </div>
      )
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
    for (var i = 0; i < post.tags.length; i += 1) {
      if (channel.tags.indexOf(post.tags[i]) > -1) {
        return true
      }
    }
  })
  return { channel, posts }
}

export default connect(mapStateToProps, { loadPosts })(ChannelViewer)
