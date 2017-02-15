import React, { PropTypes } from 'react'
import {browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { grey400, pinkA200, transparent} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import Colors from '../../client/colors';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { createContainer } from 'meteor/react-meteor-data';
import { Games } from '../api/games.js';
import { Meteor } from 'meteor/meteor';

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


  class Lobby extends React.Component {

    componentDidUpdate(prevProps, prevState) {
      let games = this.props.games;
      const currentGame = games.filter(game =>{
        return (this.props.params.gameCode===game.gameCode);
      });
      if (currentGame[0].gameStatus==='preGame') {
        browserHistory.push(`/pregame/${this.props.params.gameCode}`)
      }
    }



    goToPregame () {
      Meteor.call('games.shuffle',this.props.params.gameCode);
      browserHistory.push(`/pregame/${this.props.params.gameCode}`)
    }

    //======================================================
    // RENDERING
    //======================================================

    renderPlayerFeatures(){

      const admin =localStorage.getItem('admin');
      if (admin) {
        return (

          <RaisedButton
            style={{margin: 'auto', display: 'flex', width: '100%', height: 60}}
            label="Go to your Room"
            onTouchTap={() => this.goToPregame()}
            backgroundColor=  "#0b438b"
            labelColor="white"
          />
        )
      }
      return (
        <div >
          <RaisedButton
            style={{margin: 'auto', display: 'flex', width: '100%'}}
            label="Waiting for admin to Start the game..."
            primary={true}
          />
        </div>
      )
    }

    renderPlayers() {
      let games = this.props.games;
      const currentGame = games.filter(game =>{
        return (this.props.params.gameCode===game.gameCode);
      });

      if (currentGame[0]) {
        return currentGame[0].player.map((player, i) => {
          const you = player.name === this.props.name ? ' (you)': '';
          return (
            <div key={i}>
              <ListItem
                primaryText={`${player.name}${you}`}
                rightAvatar={<Avatar src="https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_face_black_24px.svg" />}
              />
            </div>
          )
        });
      }
      return null;
    }

    render () {


      return (
        <div style={containerStyle}>
          <div style={{margin: 'auto', width: 'inherit'}}>
            <Card style={{margin: 'auto'}}>
              <List >
                <ListItem
                  primaryText="Code"
                  secondaryText={this.props.params.gameCode}
                  rightIconButton={rightIconMenu}
                  leftIcon={<ActionGrade color={pinkA200} />}
                />
              </List>
              <Divider />
              <List className="scrollable-list">
                {this.renderPlayers()}
              </List>
            </Card>
            <div style={{textAlign:'center'}}>
            </div>
            <div className='bottom-info'>
              {this.renderPlayerFeatures()}
            </div>

          </div>
        </div>
      )
    }
  }

  export default createContainer(() => {
    return {
      name: localStorage.getItem('name'),
      gameCode: localStorage.getItem('gameCode'),
      games: Games.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
  }, Lobby);
