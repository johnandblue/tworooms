import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory } from 'react-router';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import injectTapEventPlugin from 'react-tap-event-plugin';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

const style={
  backgroundColor:'Black'
}

const card={
  backgroundColor: 'blue',
  margin: '0 auto',
  borderRadius: '20px',
  width: '280px',
  height: '400px',
  display: 'flex',
  flexDirection: 'row'
}

const down={
  border: 'red solid 5px',
  marginTop: '300px',
  // margin: '20px',
  borderBottomRightRadius: '20px',
  borderBottomLeftRadius: '20px',
  width: '280px',
  height: '100px',
  display: 'flex',
  flex: 1
}

const top={
  backgroundColor: 'cyan',
  marginTop: '100px',
  // margin: '20px',
  borderRadius: '20px',
  width: '280px',
  height: '100px',
  display: 'flex',
  flex: '1'
}

const topLeft={
  border: 'yellow solid 5px',
  // backgroundColor: 'yellow',
  marginTop: '-100px',
  borderTopLeftRadius: '20px',
  width: '280px',
  height: '300px',
  display: 'flex',
  flex: '0.7 1 0%'
}

const topRight={
  border: 'purple solid 5px',
  // backgroundColor: 'purple',
  marginTop: '-100px',
  borderTopRightRadius: '20px',
  width: '280px',
  height: '300px',
  display: 'flex',
  flex: '0.3 1 0%'
}

const text={
  color: 'white',
  textAlign: 'center',

}

export default class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <header>
          <AppBar
            title="Two Rooms and a Boom"
            // style={style}
            iconElementLeft={<IconButton
            containerElement={<Link to="/" />}
            ><ActionHome /></IconButton>}
          />
        </header>
        <div style={card}>
          <div style={top}>
            <div style={topLeft}></div>
            <div style={topRight}></div>
          </div>
          <div style={down}></div>
          {/* <p style={text}>Blue Team</p> */}
        </div>

        {/* {this.props.children} */}
      </div>
    </MuiThemeProvider>

    );
  }
}
