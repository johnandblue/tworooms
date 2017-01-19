import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Player extends Component {
  render() {
    return (
      <li>{this.props.player.text}</li>
    );
  }
}

Player.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  player: PropTypes.object.isRequired,
};
