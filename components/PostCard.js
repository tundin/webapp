import React, { Component, PropTypes } from "react"

export default class PostCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { post } = this.props
    return (
      <li >
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </li>
    )
  }
}

PostCard.propTypes = {
  post: PropTypes.object,
  currentChannel: PropTypes.string
}
