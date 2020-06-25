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
      desc: false,
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

  jumpTo(step) {
    const history = this.state.history;

    const current = history[this.state.stepNumber];
    this.setState({
      history: history.splice(0, step + 1),
      xIsNext: step % 2 === 0,
      stepNumber: step,
    });
  }

  sortMoves() {
    this.setState({
      desc: !this.state.desc,
    });
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
    let moves = [];
    history.map((move, step) => {
      console.log("map", step, move);

      if (step === 0) {
        moves.push(
          <li>
            {/* 如果给onClick的箭头函数传入一个step的参数，这个step不是map中的step，而是click event事件 */}
            <button onClick={() => this.jumpTo(step)}>Game Start</button>
          </li>
        );
      } else {
        moves.push(
          <li>
            <button onClick={() => this.jumpTo(step)}>
              #moveTo ###{step},{parseInt(move.step / 3 + 1)}行---
              {(move.step % 3) + 1}列
            </button>
          </li>
        );
        console.log("move", moves, move);
      }
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleChange(i)}
          />
        </div>
        <div className="game-info">
          <div>{desc}</div>
          <div>{this.state.desc ? moves.reverse() : moves}</div>
          <button onClick={() => this.sortMoves()} style={{ margin: 20 }}>
            reserve
          </button>
        </div>
      </div>
    );
  }
}
