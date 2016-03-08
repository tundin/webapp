import React, { PropTypes, Component } from 'react'
import PostCard from "./PostCard"


class PostIndex extends Component {

  render() {
    const { posts } = this.props
    return (
      <div className="PostIndex">
        {posts.map( post => <PostCard key={post.id} post={post}/> )}
      </div>
    )
  }
}

PostIndex.propTypes = {
  post: PropTypes.object
}

export default PostIndex
