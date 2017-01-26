import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Games } from '../api/games.js';
import RaisedButton from 'material-ui/RaisedButton';

Meteor.subscribe('games');

export default class PlayerCard extends React.Component {
  constructor(){
    super()
    this.state={
      cardShown:false,
    }
  }

  showCard() {
    this.setState({cardShown: !this.state.cardShown})
  }

  renderCard(){
    if (!this.state.cardShown) return null;
    const imageSource=`../../images/${this.props.card}.png`;
    return (
      <div style={{display:'flex', margin:10}}>
        <img style={{margin:'auto'}} src={imageSource}/>
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
      <div style={{margin:15}} >
        <RaisedButton
          onTouchTap={() => this.showCard()}
          style={{margin: 'auto', display: 'flex', width: '50%', height: 30}}
          label={this.label()}
          primary={true}
        />
        {this.renderCard()}
      </div>
    )
  }
}
