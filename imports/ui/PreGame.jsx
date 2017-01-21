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


class PreGame extends React.Component {

  renderPlayers(room) {
    let games = this.props.games;
    const currentGame = games.filter(game =>{
      return (this.props.params.gameCode===game.gameCode);
    });
    if (currentGame[0]) {
      this.shuffle (currentGame[0].player);
      const currentPlayers = currentGame[0].player;
      const index = Math.floor(currentPlayers.length / 2)
      const room1 = currentPlayers.slice(0, index)
      const room2 = currentPlayers.slice(index)
      let selRoom;
      if (room === 1) selRoom = room1;
      if (room === 2) selRoom = room2;
      return selRoom.map((playersRoom, i) =>
        <div key={i}>
          <ListItem
            primaryText={playersRoom}
            leftAvatar={<Avatar src="https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_face_black_24px.svg" />}
          />
        </div>
      );
    }
    return null;
  }

  shuffle (playersArray) {
    var i = 0
    var j = 0
    var temp = null
    for (i = playersArray.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = playersArray[i]
      playersArray[i] = playersArray[j]
      playersArray[j] = temp
    }
  }


  render () {

    let games = this.props.games;
    const currentGame = games.filter(game =>{
      // console.log(this.props.games);
      return (this.props.params.gameCode===game.gameCode);
    });

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
                    {this.renderPlayers.bind(this)(1)}
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
                    {this.renderPlayers.bind(this)(2)}
                  </List>
              </div>

            </div>
          </Card>
          <div>
            <Card>
              <CardHeader
                style={{textAlign: 'center'}}
                title=''
              />
              <CardMedia style={{margin: 'auto'}}>
                <PlayerCard
                  style={{margin: 'auto'}}
                  gameCode={this.props.params.gameCode}/>
              </CardMedia>
              <CardHeader
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                El texto de la Carta
              </CardText>
            </Card>
          </div>

          <div style={{margin: 'auto' , display: 'flex'}}>
            <RaisedButton
              style={{margin: 'auto', display: 'flex', width: '100%'}}
              label="Start Game"
              primary={true}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    games: Games.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, PreGame);
