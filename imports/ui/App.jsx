import React, { Component } from 'react';
import {browserHistory } from 'react-router';
import '../../client/main.css';
import { Ratings } from '../api/ratings.js';
import Divider from 'material-ui/Divider';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import renderFaces from './Faces';

const borderColor={};


class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      average: 0,
    };
  }

  handleClick(service, rating) {
    borderColor.borderColor="#FFCA3A";
    Meteor.call('ratings.insert', service, rating+1, (err, average) => {
      if (!err) {
        this.setState({
          average
        });
      } else {
        alert('Something bad happened.');
      }
    });
    setTimeout(() => {
      browserHistory.push('/dashboard');
    }, 2500);
  }

  //======================================================
  // RENDER FUNCTIONS
  //======================================================

  renderText () {
    if (this.state.average===0) {
      return (
        <div>
          <h1>How did we do? Please rate your experience</h1>
          <h3> We're always looking for ways to improve our customer experience</h3>
        </div>);
      }
      return (
        <h1>Thank You</h1>);
      }

  render() {
    return (
      <div className="background">
        <div className="paper rear"/>
        <div className="paper ">
          <div className="content" >
            <div className="text">
              {this.renderText()}
            </div>
          </div>
          <div className="ratings">
            {renderFaces({
              handleClick:this.handleClick.bind(this),
              average:this.state.average,
              borderColor:borderColor
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('ratings');

  return {
    ratings: Ratings.find({}).fetch(),

  };
}, App);
