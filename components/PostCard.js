import React, { Component, PropTypes } from "react"
import { Link } from "react-router"


export default class PostCard extends Component {


  render() {

    const { title, imgUrls, id } = this.props.post
    let style = {};
    if (imgUrls.length > 0) {
      style.background = `url(${imgUrls[0]}) no-repeat center right`
      style.backgroundSize = "cover"
    }
    console.log("background: ", style);
    return (
      <div
      className="PostCard"
      style={style}
      >
        <Link to={"/post/" + id }>
          <h1 className="PostTitle">
          {title}
          </h1>
          </Link>
      </div>
    )
  }
}

PostCard.propTypes = {
  post: PropTypes.object,
  currentChannel: PropTypes.string
}
