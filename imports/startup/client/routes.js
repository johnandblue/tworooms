import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from '../../ui/App.jsx';
import Lobby from '../../ui/Lobby.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/lobby" component={Lobby}/>
      <Route path="/player" component={Player}/>
    </Route>
  </Router>
);
