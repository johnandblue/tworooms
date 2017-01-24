import React, {PropTypes} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {Card, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {grey400, pinkA200, transparent} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {createContainer} from 'meteor/react-meteor-data';
import {Games} from '../api/games.js';
import PlayerCard from './PlayerCard';
import {browserHistory} from 'react-router';
import {Meteor} from 'meteor/meteor';
import Timer from 'react-countdown-clock';

const iconButtonElement = (
  <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400}/>
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

const CardStyle = {
  padding: 40,
  fontSize: 20,
  margin: 'auto',
  textAlign: 'center'
}

const style = {
  margin: 15
};

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      minutes:'-',
      seconds:'-',

    }
    setInterval(() => {

      if (this.state.timeRemaining<=0) {
        this.nextRound();
      }

      if (this.props.game && this.props.game.running) {

        if (!this.state) return null
        let timeRemaining = this.state.timeRemaining


        this.setState({
          timeRemaining: this.state.timeRemaining - 1000,
          minutes: this.leftPad(Math.floor(timeRemaining / 60000)),
          seconds: this.leftPad(Math.floor(timeRemaining % 60000) / 1000)
        });
      }
    }, 1000)
  }

  leftPad(number) {
    var output = number + '';
    while (output.length < 2) {
      output = '0' + output;
    }
    return output;
  }

  componentWillReceiveProps(nextProps) {
    const game = nextProps.game;

    if (game !== this.props.game) {
      this.setState({timeRemaining: game.timeLeft})
    }

    if (game && game.running !== this.props.game.running && !game.running) {
      this.setState({timeRemaining: game.timeLeft})
    }
  }
  nextRound(){
    Meteor.call('games.nextRound', this.props.params.gameCode);

    if (this.props.game.round > 2) {
      localStorage.clear();
      browserHistory.push('/');
    } else {
      // pause timer
      if (this.props.game.running) {
        Meteor.call('games.toggleTimer', this.props.params.gameCode);

      }
      this.setState({
        minutes:'-',
        seconds:'-',
      });
    }

  }


  toggleTimer() {
    Meteor.call('games.toggleTimer', this.props.params.gameCode);

  }

  startPause() {
    Meteor.call('games.toggleTimer', this.props.params.gameCode);
  }

  startPauselabel() {
    if (this.props.game.running) {
      return 'PAUSE';
    }
    return 'START';
  }

  //======================================================
  // RENDERING
  //======================================================


  renderPlayerFeatures() {

    const admin = localStorage.getItem('admin');
    if (admin) {
      return (
        <div style={{
          margin: 'auto',
          display: 'flex'
        }}>

        <RaisedButton style={{
          margin: 'auto',
          display: 'flex',
          width: '100%'
        }} label={this.startPauselabel()}
        onTouchTap={() => this.toggleTimer()} primary={true}/>
        <RaisedButton style={{
          margin: 'auto',
          display: 'flex',
          width: '100%'
        }} label="NEXT ROUND"
        onTouchTap={() => this.nextRound()} primary={true}/>

      </div>
    )
  }
  return null;

}

renderTimer () {
  if (!this.state) return null
  return <span>Time left: {`${this.state.minutes}:${this.state.seconds}`}</span>
}

render() {
  return (
    <div >
      <div style={containerStyle}>{this.renderTimer()}</div>
      <div>ROUND {this.props.game.round}</div>
      <div>{`Round time ${4-this.props.game.round} minutes`}</div>
      {this.renderPlayerFeatures()}
    </div>
  )
}
}

export default createContainer(ownProps => {
  const gameCode = ownProps.params.gameCode;
  const gameFetch = Games.find({gameCode: gameCode}).fetch();
  const game = gameFetch.length > 0
  ? gameFetch[0]
  : {};
  const currentPlayer = game.player
  ? game.player.find(player => player.name === localStorage.getItem('name'))
  : {};

  return {name: localStorage.getItem('name'), game, currentPlayer};
}, Game);
