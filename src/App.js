import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'
import FacebookLogin from 'react-facebook-login'




export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      isLogIn: false,
      userName: "",
      score: 0,
      getData: []
    }
  }

  getDataScore = async () => {
    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let data = await fetch(url)
    let result = await data.json()
    console.log("REesul is: ", result)
    this.setState({ getData: result.items })
  }

  componentDidMount = () => {
    this.getDataScore()
  }

  setTheState = (obj) => {
    this.setState(obj)
  }

  responseFacebook = (response) => {
    console.log(response)
    this.setState({ isLogIn: true })
    this.setState({ userName: response.name })
  }

  render() {
    return (
      <div>
        {this.state.getData.map(elm => {
          return (
            <>
              <h3>User name: {elm.player} - {elm.score} seconds</h3>
            </>
          )
          })
        }
        {
          this.state.isLogIn ? <h3>Your Name: {this.state.userName} - {this.state.score} seconds</h3> :
            <FacebookLogin
              autoLoad={true}
              appId="659117181612632"
              fields="name,email,picture"
              callback={this.responseFacebook} 
            />
        }
        <Board {...this.state} setTheState={this.setTheState} />
      </div>
    )
  }
}
