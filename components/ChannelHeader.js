import React, { PropTypes, Component } from 'react'

class ChannelHeader extends Component {

  render() {
    const { channel } = this.props
    return (
      <div className="ChannelHeader">
          <h1>{channel ? channel.id : "Loading..." }</h1>
          <p className="ChannelDescription">{channel ? "tags: " + channel.tags.join(", ") : "channel loading"}</p>
      </div>
    )
  }
}

ChannelHeader.propTypes = {
  channel: PropTypes.object
}

export default ChannelHeader
