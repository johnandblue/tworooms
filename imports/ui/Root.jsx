import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Card from 'material-ui/Card';
import {browserHistory } from 'react-router';
import '../../client/main.css';
import { Games } from '../api/games.js';
import Divider from 'material-ui/Divider';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


const containerStyle = {
  margin: 'auto',
  display: 'flex',
  width: '100%',
  height: '100vh',
  flexDirection: 'column',
}

const LoginStyle={
  display: 'flex',
  flex: 'column',
  padding: 40,
  fontSize: 10,
  // marginBottom: 15,
  textAlign: 'center',

}

const style = {
  margin:15,
};

const buttons = {
  // border: '1px solid blue',
  margin: 'auto',
  width: '50%'
  // display: 'flex',
  // flexDirection: 'column',
};

const button = {
  marginBottom: 20,
  display: 'flex',
  width: '100%',
  //height: '50px'
};


const text={
  // border: '1px solid blue',
  fontWeight: '700',
  fontFamily: 'Work Sans',
  color: '#0b438b',
  textAlign: 'center',
  // margin: 'auto',
  fontSize: 60,
  marginTop: 50,
}

class Root extends Component {
  constructor(){
    super();
    this.state={
      newGame:false,
      open:false,
      playerName:'',
      code:''
    }
  }


  handleOpenNew () {
    this.setState({newGame: true});
  }

  handleOpenJoin () {
    this.setState({open: true});
  }

  handleClose()  {

    this.setState({open: false,newGame: false});

  }

  createNewGame() {
    Meteor.call('games.insert', this.state.playerName, (err, gameCode) => {
      if (!err) {
        localStorage.setItem('name', this.state.playerName);
        localStorage.setItem('gameCode', gameCode);
        localStorage.setItem('admin', true)
        browserHistory.push(`lobby/${gameCode}`);
      } else {
        alert('Something bad happened.');
      }
    });
  }

  joinGame(){
    Meteor.call('games.addPlayer', this.state.code, this.state.playerName, (err) => {
      if (!err) {
        localStorage.setItem('name', this.state.playerName);
        localStorage.setItem('gameCode', this.state.code);
        browserHistory.push(`lobby/${this.state.code}`)
      } else {
        alert('Something bad happened.');
      }
    });
  }


  render() {

    const actionsNew = [
      <RaisedButton
        style={{display: 'flex', margin:'auto'}}
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <RaisedButton
        style={{display: 'flex', margin:'auto'}}
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.createNewGame.bind(this)}
      />,
    ];

    const actionsJoin = [
      <RaisedButton
        style={{display: 'flex', margin:'auto'}}
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <Divider />,
      <RaisedButton
        style={{display: 'flex', margin:'auto'}}
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.joinGame.bind(this)}
      />,
    ];

    return (
      <div style={containerStyle}>

        <div style={text}>
          <div>TWO</div>
          <div>ROOMS</div>
          <div>AND A</div>
          <div>BOOM</div>
        </div>

        <div style={buttons}>
          <RaisedButton
            style={button}
            label= 'NEW GAME'
            default={true}
            onTouchTap={this.handleOpenNew.bind(this)}
            // onTouchTap={this.createNewGame.bind(this)}
          />
          <RaisedButton
            style={button}
            label= 'JOIN GAME'
            default={true}
            onTouchTap={this.handleOpenJoin.bind(this)}
          />
        </div>
        <div>
          <Dialog
            style={LoginStyle}
            title="Please, write your username to enter the Lobby"
            actions={actionsNew}
            modal={true}
            open={this.state.newGame}
            >

              <TextField
                name= "player"
                hintText="Player"
                floatingLabelText="Insert your name here"
                floatingLabelFixed={true}
                onChange={(event, playerName) => this.setState({playerName})}
              />
            </Dialog>

            <Dialog
              style={LoginStyle}
              title="Insert your Username and Game Code"
              actions={actionsJoin}
              modal={true}
              open={this.state.open}
              >
                <TextField
                  name= "code"
                  hintText="Code"
                  floatingLabelText="Insert your code here"
                  floatingLabelFixed={true}
                  onChange={(event, code) => this.setState({code})}
                />
                <TextField
                  name= "player"
                  hintText="Player"
                  floatingLabelText="Insert your name here"
                  floatingLabelFixed={true}
                  onChange={(event, playerName) => this.setState({playerName})}
                />
                <br />
              </Dialog>
            </div>
          </div>
        );
      }
    }

    export default createContainer(() => {
      Meteor.subscribe('games');

      return {
        games: Games.find({}, { sort: { createdAt: -1 } }).fetch(),

      };
    }, Root);
