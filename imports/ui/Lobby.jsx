import React, { PropTypes } from 'react'

class Lobby extends React.Component {
  render () {
    console.log(this);

    return(
    <div>
      {this.props.params.gameCode}
    </div>)
  }
}

export default Lobby;
