import React, { Component, PropTypes } from 'react'

export default class Tuner extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentChannel != this.props.currentChannel) {
      this.setSelectValue(nextProps.currentChannel)
    }
  }

  getSelectValue() {
    return this.refs.select.value
  }

  setSelectValue(val) {
    // Generally mutating DOM is a bad idea in React components,
    // but doing this for a single uncontrolled field is less fuss
    // than making it controlled and maintaining a state for it. <---- DO NOT MODEL CHANNEL CREATION OFF OF THIS
    this.refs.select.value = val
  }

  handleChange() {
    this.props.onChange(this.getSelectValue())
  }


  render() {
    const { channels } = this.props
    return (
      <div>
        <p>Tune in to...</p>
        <select
          autofocus="true"
          ref="select"
          onChange={this.handleChange}>
          {channels.map(channel => {
            return (<option value={channel.id} key={channel.id}>{channel.name}</option>)
          })}
        </select>
        <p>
          Move the DevTools with Ctrl+W or hide them with Ctrl+H.
        </p>
      </div>
    )
  }
}

Tuner.propTypes = {
  channels: PropTypes.array.isRequired,
  currentChannel: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
