import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Games } from '../api/games.js';
import RaisedButton from 'material-ui/RaisedButton';
import {card} from '../api/card';




Meteor.subscribe('games');

class PlayerCard extends React.Component {
  constructor(){
    super()
    this.state={
      card:'',
    }
  }
  renderCard(){
    return <div>{this.state.card}</div>
  }


  shuffleCards(){
    if (!this.state.card) {
      Meteor.call('games.shuffleCards', '89482');
    }
    this.setState({
      card:card.cardNumber,
    });
    console.log(this.state.card);

  }

  render () {
    return (
      <div>
        <RaisedButton
          onTouchTap={()=>this.shuffleCards()}
          style={{margin: 'auto', display: 'flex', width: '25%', height: 60}}
          label="GetCard"
          primary={true}
        />
        {this.renderCard.bind(this)()}

      </div>)
    }
  }

  export default createContainer(() => {
    Meteor.subscribe('games');

    return {
      games: Games.find({}, { sort: { createdAt: -1 } }).fetch(),
      // incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    };
  }, PlayerCard);
