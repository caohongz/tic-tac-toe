import React, { Component } from "react";
import Board from "./pages/Board";
import { winnerCalulate } from "./utils/";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), step: -1 }],
      lists: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleChange(i) {
    const history = this.state.history;

    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    let winner = winnerCalulate(this.state.lists, squares);
    console.log("winner", winner);

    if (winner !== undefined || squares[i] !== null) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({ squares, step: i }),
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.stepNumber + 1,
    });
    console.log("handle", squares, this.state.xIsNext);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const lists = this.state.lists;
    let winner = winnerCalulate(lists, current.squares);
    let desc = "";
    if (winner && winner[1]) {
      desc = "winner is: " + winner[1];
      console.log("desc", desc);
    } else {
      desc = "next is: " + this.state.xIsNext ? "X" : "O";
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleChange(i)}
          />
        </div>
        <div className="game-info">{desc}</div>
      </div>
    );
  }
}
