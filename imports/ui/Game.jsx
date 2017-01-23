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
    startCountDown(){
      
    }

    //======================================================
    // RENDERING
    //======================================================
    renderPlayers(room) {
      if (!this.props.game.player) return null;

      return this.props.game.player
      .filter(player => player.room === room)
      .map(player => {
        const you = player.name === this.props.name ? ' (you)': '';
        return (
          <ListItem
            key={player.name}
            primaryText={`${player.name}${you}`}
            leftAvatar={<Avatar src="https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_face_black_24px.svg" />}
          />
        )
      });
    }


    renderPlayerFeatures(){

      const admin =localStorage.getItem('admin');
      if (admin) {
        return (
          <div style={{margin: 'auto' , display: 'flex'}}>
            <RaisedButton
              style={{margin: 'auto', display: 'flex', width: '100%'}}
              label="Start Round"
              onTouchTap={() => this.startCountDown() }
              primary={true}
            />
          </div>
        )
      }
      return null;

    }


    render () {
      return (

        <div style={containerStyle}>
          <div style={{margin: 'auto', width: 'inherit'}}>
            <Card style={{margin: 'auto'}}>
              <List>
                <ListItem
                  primaryText="Code"
                  secondaryText={this.props.params.gameCode}
                  rightIconButton={rightIconMenu}
                  leftIcon={<ActionGrade color={pinkA200} />}
                />
                <Divider />
              </List>

              <div className="columns" style={{display:'flex', flexDirection:'row',}}>
                <div style={{flex: 1}}>
                  <List>
                    <ListItem
                      primaryText="Room 1"
                      // leftIcon={<ActionGrade color={pinkA200} />}
                    />
                    <Divider />
                    {this.renderPlayers(1)}
                  </List>
                </div>

                <div style={{flex:0, width:1}}></div>

                <div style={{marginBottom: 5, borderLeft: '1px solid #cf8d8d', flex: 1}}>
                  <List>
                    <ListItem
                      primaryText="Room 2"
                      // leftIcon={<ActionGrade color={pinkA200} />}
                    />
                    <Divider />
                    {this.renderPlayers(2)}
                  </List>
                </div>

              </div>
            </Card>
            <div>
              <Card>
                <CardHeader
                  title=''
                />
                <CardMedia style={{margin: 'auto'}}>
                  <PlayerCard
                    style={{margin: 'auto'}}
                    card={this.props.currentPlayer.card}/>
                  </CardMedia>
                  <CardHeader
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                </Card>
              </div>
              <Timer
                seconds={10}
                color='blue'
                size={300}
                alpha={300}
                onComplete={console.log('finished')}
              />
              {this.renderPlayerFeatures()}
            </div>
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
