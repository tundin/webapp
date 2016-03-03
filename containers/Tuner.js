import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadChannels } from "../actions"
import { push } from "react-router-redux"
import { Link } from "react-router"



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
    const { channels } = this.props
    return (
      <div>
        <p>Tune in to...</p>
        {(channels.length !== 0) ?
          channels.map(channel =>
            (<Link
              to={"/to/" + channel.id}
              key={channel.id}
              activeClassName="active"
              className="channel-link"
              >
                {channel.id}
              </Link>))
        :
          (<h3>Loading...</h3>)
        }
        {/*<select
          autofocus="true"
          ref="select"
          onChange={this.handleChange}>
          {channels.map(channel => {
            return (<option value={channel.id} key={channel.id}>{channel.name}</option>)
          })}
        </select>*/}
        <p>
          Move the DevTools with Ctrl+W or hide them with Ctrl+H.
        </p>
      </div>
    )
  }
}

Tuner.propTypes = {
  channels: PropTypes.array.isRequired,
}

function mapStateToProps(state, props){
  const { entities, auth, current } = state
  let { channels } = entities
  channels = Object.keys(channels).map(id => channels[id])

  return { channels }

}

export default connect(mapStateToProps, { loadChannels, push })(Tuner)
