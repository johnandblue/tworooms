import React, { PropTypes } from 'react'
import Timer from 'react-countdown-clock';
class Round extends React.Component {
  render () {
    <div>
      <Timer
        seconds={180}
        color='blue'
        size={300}
        alpha={300}
        onComplete={this.setState({
          timer: false
        })}
      />
    </div>
  }
}

export default Round;
