import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export default class Timer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed:(this.props.progress-1)*100 ,
    };
  }

  componentDidMount() {

    this.timer = setTimeout(() => this.progress(this.state.completed), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff =  100000/this.props.roundTime;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  render() {
    return (
      <LinearProgress color='red' style={{height:10}} mode="determinate" value={this.state.completed} />
    );
  }
}
