import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

import App from '../../ui/App.jsx';
import Lobby from '../../ui/Lobby.jsx';
import PreGame from '../../ui/PreGame.jsx';
import Root from '../../ui/Root.jsx';
import PlayerCard from '../../ui/PlayerCard.jsx';
import Game from '../../ui/Game.jsx';

export const renderRoutes = () => (
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Root}/>
        <Route path="/lobby/:gameCode" component={Lobby} />
        <Route path="/pregame/:gameCode" component={PreGame} />
        <Route path="/game/:gameCode" component={Game} />
      </Route>
    </Router>
  </MuiThemeProvider>
);
