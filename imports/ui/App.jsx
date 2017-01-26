
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory } from 'react-router';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const style={
  backgroundColor:'Black'
}

export default
 class App extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
