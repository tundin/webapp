import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadChannels } from "../actions"
import { push } from "react-router-redux"
import { Link } from "react-router"
import Arrow from "../icons/arrow.svg"



class Tuner extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { loadChannels } = this.props
    console.log(this.constructor.displayName, "will mount");
    loadChannels();
  }

  componentWillReceiveProps(nextProps) {
    const { channels, params, push } = this.props
    if (nextProps.channels.length !== 0 && !params.channelId){
      push("/to/" + nextProps.channels[0].id) // Don't love this here
    }
  }

  render() {
    const { channels, channelId, channelIndex } = this.props
    const orderedChannels = channels.slice(channelIndex).concat(channels.slice(0, channelIndex))
    const linkToChannel = (channel, arrow) => {
      if (!channel) return
      
      return (<Link to={"/to/" + channel.id}>
        { arrow ? <Arrow /> : (<h2>{channel.id}</h2>)  }
      </Link>)
    }
    return (
      <div className="tuner">
        <p>Tune in to...</p>
        <div className="carousel">
          <div className="prevArrow">
            {linkToChannel(orderedChannels[orderedChannels.length - 1], true)}
          </div>
          <div className="prev2">
            {linkToChannel(orderedChannels[orderedChannels.length - 2])}
          </div>
          <div className="prev1">
            {linkToChannel(orderedChannels[orderedChannels.length - 1])}
          </div>
          <div className="current">
            {linkToChannel(orderedChannels[0])}
          </div>
          <div className="next1">
            {linkToChannel(orderedChannels[1])}
          </div>
          <div className="next2">
            {linkToChannel(orderedChannels[2])}
          </div>
          <div className="nextArrow">
          {linkToChannel(orderedChannels[1], true)}
          </div>
        </div>
        <p>
          Move the DevTools with Ctrl+W or hide them with Ctrl+H.
        </p>
      </div>
    )
  }
}

Tuner.propTypes = {
  channels: PropTypes.array.isRequired,
  channelId: PropTypes.string,
  channelIndex: PropTypes.number
}

function mapStateToProps(state, props){
  const { entities, auth, current } = state
  const { channelId } = props.params
  let { channels } = entities
  channels = Object.keys(channels).map(id => channels[id])

  const channelIndex = channels.findIndex(channel => channel.id === channelId)


  return { channels, channelId, channelIndex }

}

export default connect(mapStateToProps, { loadChannels, push })(Tuner)
