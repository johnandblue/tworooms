import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

import App from '../../ui/App';
import Dashboard from '../../ui/Dashboard';

export const renderRoutes = () => (
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path='/dashboard' component={Dashboard}/>
    </Router>
  </MuiThemeProvider>
);
