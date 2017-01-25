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
import CircularProgress from 'material-ui/CircularProgress';

import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

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

  class PreGame extends React.Component {
    constructor(props) {
      super(props)
      this.state={
        slideIndex: 0,

      }
    }
    handleChange (value)  {
      this.setState({
        slideIndex: value,
      });
    }
    componentDidUpdate(prevProps, prevState) {
      let game = this.props.game;
      if (game.gameStatus==='game') {
        browserHistory.push(`/game/${this.props.params.gameCode}`)
      }
    }
    goToGame () {
      Meteor.call('games.startGame',this.props.params.gameCode);
      browserHistory.push(`/game/${this.props.params.gameCode}`)
    }

    //======================================================
    // RENDERING
    //======================================================
    renderPlayerFeatures(){
      const admin =localStorage.getItem('admin');
      if (admin) {
        return (
          <RaisedButton
            onTouchTap={() => this.goToGame()}
            style={{margin: 'auto', display: 'flex', width: '100%'}}
            label="Start Game"
            primary={true}
          />
        )
      }
      return (
        <RaisedButton
          style={{margin: 'auto', display: 'flex', width: '100%'}}
          label="Waiting for admin to Start the game..."
          primary={true}
        />
      )
    }

    renderPlayers(room) {
      if (!this.props.game.player) return null;

      return this.props.game.player
      .filter(player => player.room === room)
      .map((player,i) => {
        const you = player.name === this.props.name ? ' (you)': '';
        return (
          <ListItem
            key={`${i}${player.name}`}
            primaryText={`${player.name}${you}`}
            leftAvatar={<Avatar src="https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_face_black_24px.svg" />}
          />
      )
    });
  }

  render () {

    const game = this.props.game;

    return (
      <div >
        <Tabs
          onChange={this.handleChange.bind(this)}
          value={this.state.slideIndex}
          >
            <Tab label="Room Distribution" value={0} />
            <Tab label="Card" value={1} />

          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange.bind(this)}
            >
              <div style={styles.slide}>
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
                <ListItem
                  primaryText="Room 1"
                />
                <List className='scrollable-list'>

                  <Divider />
                  {this.renderPlayers(1)}
                </List>
              </div>

              <div style={{flex:0, width:1}}></div>

              <div style={{marginBottom: 5, borderLeft: '1px solid #cf8d8d', flex: 1}}>
                <ListItem
                  primaryText="Room 2"
                />
                <List className='scrollable-list'>

                  <Divider />
                  {this.renderPlayers(2)}
                </List>
              </div>

            </div>
          </Card>
        </div>
      </div>

        <div style={styles.slide}>
          <PlayerCard
            style={{margin: 'auto'}}
            card={this.props.currentPlayer.card}/>

            </div>

        </SwipeableViews>
        <div className='bottom-info'>
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
  }, PreGame);
