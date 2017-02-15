import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Games } from '../api/games.js';
import Card from './Card';
import RaisedButton from 'material-ui/RaisedButton';
import cards from '../lib/cards.js';

Meteor.subscribe('games');

export default class PlayerCard extends React.Component {
  constructor(){
    super()
    this.state={
      cardShown:true,
    }
  }

  showCard() {
    this.setState({cardShown: !this.state.cardShown})
  }

  renderCard(){
    if (!this.state.cardShown) return null;
    const imageSource=`../../images/${this.props.card}.png`;
    return (
      <div style={{display:'flex', marginTop: '20px'}}>
        <Card
          className='CardComponent'
          rol={cards[this.props.card].rol}
          team={cards[this.props.card].team}
          description={cards[this.props.card].description}
          image={cards[this.props.card].image}
          teamColorDark={cards[this.props.card].teamColorDark}
          teamColorLight={cards[this.props.card].teamColorLight}
        />
      </div>
    )
  }
  label(){
    if (!this.state.cardShown) {
      return "SHOW CARD";
    }
    return "HIDE CARD"
  }

  render () {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop:'20px', 
        // marginBottom:'20px'
      }} >
        {this.renderCard()}
      </div>
    )
  }
}
