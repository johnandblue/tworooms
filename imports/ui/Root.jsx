import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Card from 'material-ui/Card';
import {browserHistory } from 'react-router';
import '../../client/main.css';
import { Games } from '../api/games.js';


const containerStyle = {
  margin: '0 auto',
  // width: 960,
  padding: 20,
  display: 'flex'
}

const LoginStyle={
  marginTop:200,
  padding: 40,
  fontSize: 20,
  marginBottom: 15,
  textAlign: 'center',

}

const style = {
  margin:15,
};


export default class Root extends Component {
  constructor(){
    super();
    this.state={
      newGame:false,
      open:false,
      playerName:'',
      code:'',


    }
  }

  handleOpen2 () {
    this.setState({newGame: true});
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose()  {

    this.setState({open: false,newGame: false});

  }

  createNewGame() {
    const gameCode = Math.floor(Math.random()*100000);

    Meteor.call('games.insert', gameCode,this.state.playerName);

    browserHistory.push(`game/${gameCode}/admin`)
  }
  joinGame(){

    // Meteor.call('games.insert', gameCode,this.state.playerName);

    browserHistory.push(`game/${this.code}`)
  }


  render() {

    const actions = [
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

    return (
      <div style={containerStyle}>
        <div style={{margin:'auto'}}>
          <Card style={LoginStyle}>
            <RaisedButton
              style={style}
              label= 'NEW GAME'
              primary={true}
              onTouchTap={this.handleOpen2.bind(this)}
              // onTouchTap={this.createNewGame.bind(this)}
            />
            <RaisedButton
              style={style}
              label= 'JOIN GAME'
              primary={true}
              onTouchTap={this.handleOpen.bind(this)}
            />
            <Dialog
              style={LoginStyle}
              title="Please, write your username to enter the Lobby"
              actions={actions}
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
                actions={actions}
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
                  <br />
                  <TextField
                    name= "player"
                    hintText="Player"
                    floatingLabelText="Insert your name here"
                    floatingLabelFixed={true}
                    onChange={(event, playerName) => this.setState({playerName})}
                  />
                </Dialog>

              </Card>
            </div>
          </div>
        );
      }
    }
