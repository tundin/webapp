import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadPost } from "../actions"

class PostShow extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    window.scrollTo(0,0)
    const { loadPost, postId} = this.props
    console.log(this.constructor.displayName, "will mount.");
    loadPost(postId)
  }

  render() {
    const { post } = this.props
    return (
      <div className="PostShow">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <ul className="photoGallery">
          {post.imgUrls.map((imgUrl, index) => {
            return (
              <li key={index}><img src={imgUrl} alt={"image ${index} for post ${post.id}"}/></li>
            )
          })}
        </ul>
      </div>
    )
  }
}

PostShow.propTypes = {
  postId: PropTypes.string.isRequired,
  post: PropTypes.object
}

function mapStateToProps(state, props){
  const { entities, auth, current } = state
  const { postId } = props.params
  const post = entities.posts[postId]

  return { post, postId }
}

export default connect(mapStateToProps, {loadPost})(PostShow)
