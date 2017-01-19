import React, { Component } from 'react';

// import Task from './Task.jsx';

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
        {this.props.children}
      </div>
    );
  }
}
