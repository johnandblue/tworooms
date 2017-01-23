import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor';

class Game extends React.Component {
  startCountDown(){
    Meteor.call('games.startGame',this.props.params.gameCode);
  }


  renderPlayerFeatures(){
    const admin =localStorage.getItem('admin');
    if (admin) {
      return (
        <div style={{margin: 'auto' , display: 'flex'}}>
          <RaisedButton
            style={{margin: 'auto', display: 'flex', width: '100%'}}
            label="Go to your Room"
            onTouchTap={() => this.startCountDown()}
            primary={true}
          />
        </div>
      )
    }
    return null;

  }


  render () {
    return <div>
      {this.renderPlayerFeatures()}
    </div>
  }
}

export default Game;
