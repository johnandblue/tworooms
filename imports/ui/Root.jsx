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
  width: 960,
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
    this.state={open:false, code:''};
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose()  {
    if (this.state.code.length>0) {

    }
    this.setState({open: false});

  }

  createNewGame() {
    const gameCode = Math.floor(Math.random()*100000);

    // const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Games.insert({
      gameCode,
      createdAt: new Date(), // current time
      // owner: Meteor.userId(),           // _id of logged in user
      // username: Meteor.user().username,  // username of logged in user
    });


    browserHistory.push(`game/${gameCode}`)
  }
  joinGame(){


  }


  render() {

    const actions = [
        <RaisedButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose.bind(this)}
        />,
        <RaisedButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleClose.bind(this)}
        />,
      ];

    return (
      <div style={containerStyle}>
        <div style={{margin:'auto'}}>
          <Card style={LoginStyle}>
            <RaisedButton
              label= 'NEW GAME'
              primary={true}
              onTouchTap={this.createNewGame.bind(this)}
              style={style}
            />
            <RaisedButton
              label= 'JOIN GAME'

              primary={true}
              style={style}
              onTouchTap={this.handleOpen.bind(this)}
              /  >
              <Dialog
                title="Please, write your code to enter the Lobby"
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
                  /><br />
                </Dialog>
              </Card>

            </div>
          </div>
        );
      }
    }
