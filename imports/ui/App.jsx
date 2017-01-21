import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory } from 'react-router';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const style={
  backgroundColor:'#D32F2F'
}

export default class App extends Component {

  render() {
    return (
      <div>
        <header>
          <AppBar
            title="Two Rooms and a Boom"
            style={style}
            iconElementLeft={<IconButton
            containerElement={<Link to="/" />}
            ><ActionHome /></IconButton>}
          />
        </header>
        {this.props.children}
      </div>
    );
  }
}
