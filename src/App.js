import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'

export default class extends Component {
  constructor(props){
    super(props)
    this.state={
      squares: Array(9).fill(null),
      isXNext: true,
      history: [] //{squares: square (at that moment), isXNext: the value (at that moment)}
    }
  }

  setTheState = (obj) => {
    this.setState(obj)
  }

  render() {
    return (
      <div>
        <Board {...this.state} setTheState={this.setTheState}/>
        <div>History: {this.state.history}</div>
      </div>
    )
  }
}
