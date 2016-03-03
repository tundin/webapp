import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import App from './containers/App'
import Tuner from "./containers/Tuner"
import Channel from "./components/ChannelViewer"

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="to"/>
    <Route path="/to(/:channelId)" components={{Tuner: Tuner, Channel: Channel}} />
    <Route path="/post/:postId"/>
  </Route>
)
