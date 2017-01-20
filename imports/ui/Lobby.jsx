import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const containerStyle = {
  margin: '0 auto',
  width: 960,
  padding: 20,
  display: 'flex'
}

const CardStyle={
  marginTop:200,
  padding: 40,
  fontSize: 20,
  marginBottom: 15,
  textAlign: 'center',

}

const style = {
  margin:15,
};


class Lobby extends React.Component {

  // constructor(){
  //   super();
  //   this.state={
  //     code: {this.props.params.gameCode},
  //     players: []
  //   };
  // }
  //
  // addPlayer() {
  //   this.
  // }

  

  render () {
    console.log(this);
    return (
      <div style={containerStyle}>
        <div style={{margin: 'auto'}}>
          <Card style={CardStyle}>

            <TextField
              name= "player"
              hintText="player"
              floatingLabelText="Insert your name"
              floatingLabelFixed={true}
              // onChange={(event, player) => this.setState({...player})}
            />

            <CardHeader
              title={this.props.params.gameCode}
            />
          </Card>
        </div>
      </div>)

    }
  }

  export default Lobby;
