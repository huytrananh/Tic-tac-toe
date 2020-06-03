import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {
    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]}/>
    }

    boxClick = (id) => {
        console.log("Box Clicked!. Your ID: ", id)
        // change the value from null to "X" at the array index number ID
        let squaresFromApp = this.props.squares
        if (this.calculateWinner(squaresFromApp) || squaresFromApp[id]) {
            return;
        }
        console.log("Square you got so far is", squaresFromApp)
        squaresFromApp[id] = this.props.isXNext ? 'X' : 'O'
        console.log("After change", squaresFromApp)

        this.props.setTheState({
            squares: squaresFromApp, 
            isXNext: !this.props.isXNext, 
            history:[
                ...this.props.history,
                {
                    squares: squaresFromApp, 
                    isXNext: !this.props.isXNext, 
                }
            ]
        })
    }

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[b] === squares[a] && squares[c] === squares[a]) {
              return squares[a]
            }
        }
        return null
    }

    
    render() {
        const winner = this.calculateWinner(this.props.squares)
        let status = ''
        // status = `Next Player:  ${this.props.isXNext ? "X" : "O"}`

        if(winner){
            status = 'Winner: ' + winner
        }else{
            status = `Next Player: ${this.props.isXNext ? "X" : "O"}`
        }

        return (
            <div>
                <h1>{status}</h1>
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}
