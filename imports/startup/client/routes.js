import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
// import AppContainer from '../../ui/containers/AppContainer.js';
// import ListPageContainer from '../../ui/containers/ListPageContainer.js';
gd// import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
// import NotFoundPage from '../../ui/pages/NotFoundPage.js';
import App from '../../ui/App.jsx';
import Lobby from '../../ui/Lobby.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/lobby" component={Lobby}/>




    </Route>
  </Router>
);
