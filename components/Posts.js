import React, { Component, PropTypes } from 'react'
import Post from "./Post"

export default class Posts extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { posts } = this.props
    return (
      <ul className="posts">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array
}
