import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Card from 'material-ui/Card';
import {browserHistory } from 'react-router';
import '../../client/main.css';
import { Games } from '../api/games.js';
import Divider from 'material-ui/Divider';
import Colors from '../../client/colors';
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
  padding: 49,
  fontSize: 20,
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
  marginBottom: 30,
  display: 'flex',
  width: '100%',
  height: 60
};


const text={
  // border: '1px solid blue',
  fontWeight: '700',
  fontFamily: 'Work Sans',
  color: '#FD7400',
  textAlign: 'center',
  // margin: 'auto',
  fontSize: 40,
  marginTop: '15px',
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

  componentWillMount () {
    localStorage.removeItem('admin');
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

    const newActive = Boolean(!this.state.playerName.match(/\w+/));
    const joinActive = Boolean(!this.state.playerName.match(/\w+/) || !this.state.code.match(/\w+/));

    const actionsNew = [
      <RaisedButton
        style={{display: 'flex', margin:'auto', height: 60}}
        disabled={newActive}
        label="OK"
        backgroundColor=  {Colors.primary}
        labelColor="white"
        keyboardFocused={true}
        onTouchTap={this.createNewGame.bind(this)}
      />,
      <RaisedButton
        style={{display: 'flex', margin:'auto', height: 60}}
        label="Cancel"
        // secondary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];
    const actionsJoin = [
      <RaisedButton
        style={{display: 'flex', margin:'auto', height: 60}}
        disabled={joinActive}
        label="Submit"
        labelColor="white"
        label="OK"
        backgroundColor=  {Colors.primary}
        // primary={true}
        keyboardFocused={true}
        onTouchTap={this.joinGame.bind(this)}
      />,
      <Divider />,
      <RaisedButton
        style={{display: 'flex', margin:'auto', height: 60}}
        label="Cancel"
        // secondary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];

    return (
      <div style={containerStyle}>

        <div style={text}>
          <div>TWO</div>
          <div>ROOMS</div>
          <div>AND A</div>
          <div>BOOM</div>
          <div
            style={{
              fontSize: 15,
              fontFamily: 'Lato',
              fontWeight: 400,
              width: '100%',
              color: Colors.tertiary
            }}
          >Star Wars Edition
          </div>
        </div>

        <div style={buttons}>
          <RaisedButton
            backgroundColor=  {Colors.primary}
            labelColor="white"
            label= 'NEW GAME'
            style={button}
            onTouchTap={this.handleOpenNew.bind(this)}
          />
          <RaisedButton
            backgroundColor=  {Colors.tertiary }
            labelColor="white"
            label= 'NEW GAME'
            style={button}
            label= 'JOIN GAME'
            onTouchTap={this.handleOpenJoin.bind(this)}
          />
        </div>
        <div>
          <Dialog
            style={{
              margin: 'auto',
              textAlign: 'center'
            }}
            actions={actionsNew}
            modal={true}
            open={this.state.newGame}
          >

            <TextField
              name= "player"
              hintText="Your name (required)"
              onChange={(event, playerName) => this.setState({playerName})}
            />
          </Dialog>

          <Dialog
            style={{margin: 'auto', textAlign: 'center'}}
            actions={actionsJoin}
            modal={true}
            open={this.state.open}
          >
            <TextField
              name= "player"
              hintText="Your name (required)"
              type="text"
              onChange={(event, playerName) => this.setState({playerName})}
            />
            <TextField
              name= "code"
              hintText="Game code (required)"
              type="text"
              onChange={(event, code) => this.setState({code})}
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
