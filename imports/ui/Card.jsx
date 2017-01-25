import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {browserHistory } from 'react-router';
import { Link } from 'react-router';

const style={
  backgroundColor:'Black'
}

        const card={
          margin: 'auto',
          borderRadius: '20px',
          // width: '280px',
          // height: '400px',
          display: 'flex',
          flexDirection: 'column'
        }

        const down={
          // border: 'red solid 5px',
          backgroundColor: '#0b438b',
          marginTop: '0px',
          borderBottomRightRadius: '20px',
          borderBottomLeftRadius: '20px',
          width: '280px',
          height: '100px',
          display: 'flex',
          flex: 1,
        }

        const top={
          // backgroundColor: 'cyan',
          marginTop: '0px',
          borderRadius: '20px',
          width: '280px',
          height: '300px',
          display: 'flex',
          flex: '1'
        }

        const topLeft={
          // border: 'yellow solid 5px',
          backgroundColor: '#5b8fd1',
          marginTop: '0px',
          borderTopLeftRadius: '20px',
          width: '280px',
          height: '300px',
          display: 'flex',
          flex: '0.65 1 0%'
        }

        const topRight={
          // border: 'purple solid 5px',
          backgroundColor: '#0b438b',
          marginTop: '-0px',
          borderTopRightRadius: '20px',
          width: '280px',
          height: '300px',
          display: 'flex',
          flex: '0.35 1 0%',
          flexDirection: 'row',
        }

        const text={
          fontWeight: '700',
          fontFamily: 'Work Sans',
          color: 'white',
          textAlign: 'center',
          margin: 'auto',
          fontSize: 30,
        }

        const cardSideText = {
          position: 'absolute',
          transform: 'rotate(90deg)',
          top: 140,
          right: -104,
          width: 300
        }

        const textRight1={
          fontWeight: '400',
          fontFamily: 'Lato',
          color: 'white',
          textAlign: 'left',
          display: 'flex',
          fontSize: 30,
          margin: 0,

        }

        const textRight2={
          fontWeight: '700',
          fontFamily: 'Work Sans',
          color: 'white',
          textAlign: 'left',
          display: 'flex',
          fontSize: 37,
          marginLeft: '-226px',
          margin: 0,
          marginTop: -10
        }

        const textRight3={
          fontStyle: 'italic',
          fontFamily: 'Lato',
          color: 'white',
          textAlign: 'left',
          display: 'flex',
          fontSize: 11,
          marginLeft: '-293px',
          margin: 0,
          marginTop: -5
        }

        const imageStyle= {
          width: '90%',
          opacity: 0.5,
          margin: '0 auto',
        }

export default class Card extends React.Component {
  constructor(props){
    super(props)
    this.state={
      visible: true,
    }
  }

  tapCard() {
    this.setState({
      visible: !this.state.visible,

    })
  }

  renderImage() {
    if (!this.state.visible) return null;
    return (
      <img
        style={imageStyle}
        src={this.props.image}
        >
        </img>
    )
  }

  renderDescription() {
    if (!this.state.visible) return null;
    return (
      <div style={cardSideText}>
        <p style={textRight1}>YOU ARE THE</p>
        <p style={textRight2}>{this.props.rol}</p>
        <p style={textRight3}>{this.props.description}</p>
      </div>
    )

  }


  render() {
    return (
        <div style={card} onTouchTap={() => this.tapCard()}>
          <div style={top}>
            <div style={{...topLeft, backgroundColor: this.props.teamColorLight}}>
              {this.renderImage()}
            </div>
            <div style={{...topRight, backgroundColor: this.props.teamColorDark, position: 'relative'}}>
              {this.renderDescription()}
            </div>
          </div>
          <div style={{...down, backgroundColor: this.props.teamColorDark}}>
            <p style={text}>{this.props.team}</p>
          </div>
        </div>
    );
  }
}
