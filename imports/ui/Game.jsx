import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { Card, CardMedia, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { grey400, pinkA200, transparent} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { createContainer } from 'meteor/react-meteor-data';
import { Games } from '../api/games.js';
import PlayerCard from './PlayerCard';
import {browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import Timer from 'react-countdown-clock';


  let timeinterval;

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey400} />
    </IconButton>
  );

  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem>Change Game</MenuItem>
      <MenuItem>Exit Game</MenuItem>
    </IconMenu>
  );

  const containerStyle = {
    margin: '0 auto',
    width: '100%',
    // padding: 20,
    display: 'flex'
  }

  const CardStyle={
    padding: 40,
    fontSize: 20,
    margin: 'auto',
    textAlign: 'center',
  }

  const style = {
    margin:15,
  };


  class Game extends React.Component {

    componentDidUpdate(prevProps, prevState) {
      if (this.props.game.gameStatus==='countDown') {
        this.renderTimer(this.props.game.stopWatch)
      }
    }

    startCountDown(){
      Meteor.call('games.startCountDown',this.props.params.gameCode,(error,response)=>{
        this.renderTimer(response);
      });
    }
    pause(){
      clearInterval(timeinterval);
    }

    //======================================================
    // RENDERING
    //======================================================

    renderPlayerFeatures(){

      const admin =localStorage.getItem('admin');
      if (admin) {
        return (
          <div style={{margin: 'auto' , display: 'flex'}}>
            <RaisedButton
              style={{margin: 'auto', display: 'flex', width: '100%'}}
              label={`Start Round${this.props.game.round}`}
              onTouchTap={() => this.startCountDown() }
              primary={true}
            />
            <RaisedButton
              style={{margin: 'auto', display: 'flex', width: '100%'}}
              label="Pause"
              onTouchTap={() => this.pause() }
              primary={true}
            />
          </div>
        )
      }
      return null;

    }

    renderTimer(timeRemaining){
      const clock = this.refs.timer;
      if (timeinterval) {
        clearInterval(timeinterval);
      }

       timeinterval = setInterval(function(){
        timeRemaining=timeRemaining-1;
        clock.innerHTML =
        'minutes: ' + Math.floor(timeRemaining/60) + '<br>' +
          'seconds: ' + timeRemaining%60;
          if (timeRemaining<=0){
            clearInterval(timeinterval);
          }
        },1000);
      }


    render () {
      return (

        <div >
          <div style={containerStyle} ref='timer'></div>
          <div>ROUND {this.props.game.round}</div>
          {this.renderPlayerFeatures()}
        </div>
      )
    }
  }

  export default createContainer(ownProps => {
    const gameCode = ownProps.params.gameCode;
    const gameFetch = Games.find({gameCode: gameCode}).fetch();
    const game = gameFetch.length > 0 ? gameFetch[0] : {};
    const currentPlayer = game.player ?
    game.player.find(player =>  player.name === localStorage.getItem('name')) :
    {};

    return {
      name: localStorage.getItem('name'),
      game,
      currentPlayer,
    };
  }, Game);
