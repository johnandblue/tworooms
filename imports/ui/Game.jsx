import React, { PropTypes } from 'react'

class Game extends React.Component {
  renderPlayerFeatures(){

    const admin =localStorage.getItem('admin');
    if (admin) {
      return (
        <div style={{margin: 'auto' , display: 'flex'}}>
          <RaisedButton
            style={{margin: 'auto', display: 'flex', width: '100%'}}
            label="Go to your Room"
            onTouchTap={() => this.goToPregame()}
            primary={true}
          />
        </div>
      )
    }
    return <div style={{padding:20, color:'white', backgroundColor:'red'}}>Waiting for other players to join the game...</div>;

  }
  render () {
  return <div>


    {this.renderPlayerFeatures()}
  </div>
  }
}

export default Game;
