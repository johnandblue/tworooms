import RaisedButton from 'material-ui/RaisedButton';
import React, {PropTypes} from 'react'
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {Card, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {grey400, pinkA200, transparent,blue500, red500, greenA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {createContainer} from 'meteor/react-meteor-data';
import {Games} from '../api/games.js';
import {browserHistory} from 'react-router';
import {Meteor} from 'meteor/meteor';
import Timer from './Timer';
import PlayerCard from './PlayerCard';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import FontIcon from 'material-ui/FontIcon';

import PauseIcon from 'material-ui/svg-icons/av/pause-circle-outline';
import PlayIcon from 'material-ui/svg-icons/av/play-circle-outline';

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
const iconStyles = {
  marginRight: 24,
};

const style = {
  margin: 15
};
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      minutes:'03',
      seconds:'00',
      slideIndex: 0,


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

  handleChange (value)  {
    this.setState({
      slideIndex: value,
    });
  }

  leftPad(number) {
    number=Math.floor(number);
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

    if (game && game.round !== this.props.game.round) {
      if (this.props.game.round > 2) {
        localStorage.clear();
        browserHistory.push('/');
      } else {
        this.setState({
          minutes:`0${3-this.props.game.round}`,
          seconds:'00',
        });
      }
    }
  }

  nextRound(){
    Meteor.call('games.nextRound', this.props.params.gameCode);

    if (this.props.game.round <= 2) {
      // pause timer
      if (this.props.game.running) {
        Meteor.call('games.toggleTimer', this.props.params.gameCode);
      }
    }
  }


  toggleTimer() {
    Meteor.call('games.toggleTimer', this.props.params.gameCode);

  }

  startPause() {
    Meteor.call('games.toggleTimer', this.props.params.gameCode);
  }
  nextGameLabel(){
    if (this.props.game.round > 2) {
      return "END GAME";
    }
    return "NEXT ROUND";
  }

  startPauselabel() {
    if (this.props.game.running) {
      return <PauseIcon style={{height: 40,
        width: 40, margin: 10}} color="white"/>;
      }
      return <PlayIcon style={{height: 40,
        width: 40, margin: 10}} color="white" />
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

            <RaisedButton
              backgroundColor=  "#0b438b"
              labelColor="white"
              style={{
                margin: 'auto',
                display: 'flex',
                width: '90%',
                height: 60
              }} label={this.startPauselabel()}
              onTouchTap={() => this.toggleTimer()} />
              <RaisedButton
                backgroundColor=  "#0b438b"
                labelColor="white"
                style={{
                  margin: 'auto',
                  display: 'flex',
                  width: '90%',
                  height: 60,
                  color: 'blue'
                }}
                label={this.nextGameLabel()}
                onTouchTap={() => this.nextRound()} />

              </div>
            )
          }
          return null;

        }

        renderTimer () {
          if (!this.state) return null
          if (this.props.game.running){
            return (
              <div>

                <span>Time left: {`${this.state.minutes}:${this.state.seconds}`}
                </span>
              </div>)
            }
            return (
              <div>
                <span>Time left: {`${this.state.minutes}:${this.state.seconds}`}
                </span>
              </div>)
            }
            renderStatusBar(){
              if (!this.state) return null
              if (this.props.game.running){
                return (
                  <div>
                    <Timer
                      roundTime={this.props.game.timeLeft}
                      progress={(4-this.props.game.round)*60000/this.props.game.timeLeft}
                    />
                  </div>)
                }
              }
              render() {
                return (
                  <div>
                    <Tabs
                      style={{
                        height: 60,
                        backgroundColor:  "#0b438b",
                        color:'white'}}
                        onChange={this.handleChange.bind(this)}
                        value={this.state.slideIndex}
                        >
                          <Tab label="Game Status"   style={{
                            backgroundColor:  "#0b438b",
                            color:'white'
                          }}
                          value={0} />
                          <Tab
                            style={{
                              backgroundColor:  "#0b438b",
                              color:'white'
                            }}
                            label="Card" value={1} />

                          </Tabs>
                          <SwipeableViews
                            index={this.state.slideIndex}
                            onChangeIndex={this.handleChange.bind(this)}
                            >
                              <div style={styles.slide}>

                                <div className="game-status">ROUND { this.props.game.round}</div>
                                <div className="game-status">{this.renderTimer()}</div>
                                <div className="game-status">
                                  {`Round time ${4-this.props.game.round} minutes`}


                                </div>
                              </div>
                              <div style={styles.slide}>

                                <PlayerCard
                                  style={{margin: 'auto'}}
                                  card={this.props.currentPlayer.card}/>
                                </div>
                              </SwipeableViews>

                              <div className='bottom-info'>
                                <div style={{padding:10}}>
                                  {this.renderStatusBar()}
                                </div>
                                {this.renderPlayerFeatures()}
                              </div>

                            </div>
                          );
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
