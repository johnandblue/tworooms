import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

import App from '../../ui/App.jsx';
import Lobby from '../../ui/Lobby.jsx';
import Root from '../../ui/Root.jsx';

export const renderRoutes = () => (
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Root}/>
        <Route path="/game/:gameCode" component={Lobby} />
        <Route path="/game/:gameCode/admin" component={Lobby} />
      </Route>
    </Router>
  </MuiThemeProvider>
);
