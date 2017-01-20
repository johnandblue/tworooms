import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import { createContainer } from 'meteor/react-meteor-data';
import { Games } from '../api/games.js';

const containerStyle = {
 margin: '0 auto',
 // width: 960,
 padding: 20,
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

 // constructor(){
 //   super();
 //   this.state={
 //     code: {this.props.params.gameCode},
 //     players: []
 //   };
 // }
 //
 // addPlayer() {
 //   this.
 // }

 renderPlayers() {
   let games = this.props.games;

   const currentGame = games.filter(game =>{
     return (this.props.params.gameCode===game.gameCode);
   });

   if (currentGame[0]) {
     return currentGame[0].player.map((player, i) =>
     <div key={i}>
       <ListItem
         primaryText={player}
         rightAvatar={<Avatar src="https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_face_black_24px.svg" />}
       />
     </div>
   );
 }
 return null;
}

render () {
  return (
    <div style={containerStyle}>
      <div style={{margin: 'auto'}}>
        <Card style={{margin: 'auto'}}>
          <List style={{width:200}}>
            <ListItem
              primaryText="Code"
              secondaryText={this.props.params.gameCode}
              leftIcon={<ActionGrade color={pinkA200} />}
            />
          </List>
          <Divider />
          <List>
            <ListItem
              primaryText={this.renderPlayers.bind(this)()}
              rightAvatar={<Avatar src="https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_face_black_24px.svg" />}
            />
          </List>
        </Card>
        <div style={{margin: 'auto'}}>
          <RaisedButton
            style={{margin: 'auto'}}
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
   }, Lobby);
