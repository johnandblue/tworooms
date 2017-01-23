import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Card from 'material-ui/Card';
import {browserHistory } from 'react-router';
import '../../client/main.css';
import { Games } from '../api/games.js';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


const containerStyle = {
  margin: '0 auto',
  // width: 960,
  // padding: 20,
  display: 'flex'
}

const LoginStyle={
  // marginTop:200,
  padding: 40,
  fontSize: 20,
  marginBottom: 15,
  textAlign: 'center',

}

const style = {
  margin:15,
};

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
        browserHistory.push(`game/${gameCode}`);
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
        browserHistory.push(`game/${this.state.code}`)
      } else {
        alert('Something bad happened.');
      }
    });
  }


  render() {

    const actionsNew = [
      <RaisedButton
        style={{margin:15}}
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <RaisedButton
        style={{marginLeft:10, marginRight:10}}
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.createNewGame.bind(this)}
      />,
    ];

    const actionsJoin = [
      <RaisedButton
        style={{margin:15}}
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <RaisedButton
        style={{marginLeft:10, marginRight:10}}
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.joinGame.bind(this)}
      />,
    ];

    return (
      <div style={containerStyle}>
        <div style={{margin:'auto'}}>
          <Card style={LoginStyle}>
            <RaisedButton
              style={style}
              label= 'NEW GAME'
              primary={true}
              onTouchTap={this.handleOpenNew.bind(this)}
              // onTouchTap={this.createNewGame.bind(this)}
            />
            <RaisedButton
              style={style}
              label= 'JOIN GAME'
              primary={true}
              onTouchTap={this.handleOpenJoin.bind(this)}
            />
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

          </Card>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('games');

  return {
    games: Games.find({}, { sort: { createdAt: -1 } }).fetch(),
    // incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  };
}, Root);
