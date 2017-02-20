import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Ratings } from '../api/ratings.js';
import '../../styles/dashboard.css';
import '../../styles/FacesBig.css';


let colors= ['darkred', 'darkred','#F2D100', 'orange','#6EBD19'];
let style;
let fontColor;
const auxText={
  fontSize:80,
  color:"rgba(0, 0, 0, 0.3)",

}
class Dashboard extends React.Component {

  constructor(){
    super();
    this.state={
      className:''
    }
  }
  componentDidMount() {
    const classNames=['sad-big worst-big', 'sad-big', 'regular-big', 'smile-big', 'smile-big best-big'];
    const rating = Math.floor(this.props.ratings[0].average-0.1);
    style = {background:colors[rating], color:colors[rating]};
    fontColor={color:colors[rating]}
    this.setState({
      className:`circle-big ${classNames[rating]} `
    });
  }

renderScore(){
  if (this.props.ratings) return `${Math.floor((this.props.ratings[0].average/5)*100)}`;
  return null;
}
  render () {

    return (
      <div>
        <div className="header"
          style={style}
          >
          </div>

            <div className="container">
              <div className="score"
                style={fontColor}>
                  {this.renderScore()}
                  <span style={auxText}>%
                    <p style={{
                      fontFamily: 'Fjala One',
                      fontSize:15,
                      fontWeight:'bolder'
                    }}>CUSTOMER SATISFACTION RATING</p>
                  </span>

              </div>
              <div className={this.state.className}
              style={style}>
              </div>
            </div>
          <div
              className= "footer"
              style={style}>
        </div>
      </div>
          )
        }
      }


      export default createContainer(() => {
        Meteor.subscribe('ratings');

        return {
          ratings: Ratings.find({service:'daily'}).fetch(),

        };
      }, Dashboard);
