import React, { Component, PropTypes } from "react"
import { Link } from


export default class PostCard extends Component {


  render() {

    const { title, imgUrls } = this.props.post
    return (
      <div className="PostCard">
        <h1 className="PostTitle">
          {title}
        </h1>
        <img
          src={imgUrls.length > 0 ? imgUrls[0] : "https://tundinmedia.blob.core.windows.net/images/twitter|112323837/tundin.jpeg" }
          alt=""
        />
      </div>
    )
  }
}

PostCard.propTypes = {
  post: PropTypes.object,
  currentChannel: PropTypes.string
}
