import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import {browserHistory } from 'react-router';

export default class Root extends Component {

  createNewGame() {
    const gameCode = Math.floor(Math.random()*100000);
    browserHistory.push(`game/${gameCode}`)
  }


  render() {
    return (
      <div className="container">
        <Card>
          <RaisedButton
            label= 'NEW GAME'
            primary={true}
            onTouchTap={this.createNewGame.bind(this)}
          />
        </Card>
        <RaisedButton
          label= 'JOIN GAME'
          primary={true}
          // onTouchTap={this.createNewGame.bind(this)}
        />
      </div>
    );
  }
}
