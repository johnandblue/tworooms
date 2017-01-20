import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { createContainer } from 'meteor/react-meteor-data';
import { Games } from '../api/games.js';

const containerStyle = {
  margin: '0 auto',
  width: 960,
  padding: 20,
  display: 'flex'
}

const CardStyle={
  marginTop:200,
  padding: 40,
  fontSize: 20,
  marginBottom: 15,
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
    const filteredPlayers = games.filter(game =>{
      return (String(this.props.params.gameCode)===String(game.gameCode));
    });
    console.log(filteredPlayers);
    return filteredPlayers.map((player) => (

      <div>player.playerName</div>

    ));
  }


  render () {
    return (
      <div style={containerStyle}>
        <div style={{margin: 'auto'}}>
          <Card style={CardStyle}>

            <CardHeader
              title={this.props.params.gameCode}
            />
          </Card>
          <p>{this.renderPlayers.bind(this)()}</p>
        </div>
      </div>)

    }
  }

  export default createContainer(() => {
    return {
      games: Games.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
  }, Lobby);
