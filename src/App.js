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

    if (winner !== undefined || squares[i] !== null) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({ squares, step: i }),
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.stepNumber + 1,
    });
  }

  jumpTo(step) {
    const history = this.state.history;
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
    } else if (!winner && history.length === 10) {
      desc = "平局";
    } else {
      desc = "next is: " + this.state.xIsNext ? "X" : "O";
    }
    let moves = [];
    history.map((move, step) => {
      if (step === 0 && history.length === 1) {
        moves.push(
          <li key={step}>
            {/* 如果给onClick的箭头函数传入一个step的参数，这个step不是map中的step，而是click event事件 */}
            <button onClick={() => this.jumpTo(step)}>
              <strong>Game Start</strong>
            </button>
          </li>
        );
      } else if (step === 0 && history.length !== 1) {
        moves.push(
          <li key={step}>
            {/* 如果给onClick的箭头函数传入一个step的参数，这个step不是map中的step，而是click event事件 */}
            <button onClick={() => this.jumpTo(step)}>Game Start</button>
          </li>
        );
      } else if (step === history.length - 1) {
        moves.push(
          <li key={step}>
            <button onClick={() => this.jumpTo(step)}>
              <strong>
                #moveTo ###{step},{parseInt(move.step / 3 + 1)}行---
                {(move.step % 3) + 1}列
              </strong>
            </button>
          </li>
        );
      } else {
        moves.push(
          <li key={step}>
            <button onClick={() => this.jumpTo(step)}>
              #moveTo ###{step},{parseInt(move.step / 3 + 1)}行---
              {(move.step % 3) + 1}列
            </button>
          </li>
        );
      }
      return moves;
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winner={winner ? winner[0] : false}
            onClick={(i) => this.handleChange(i)}
          />
        </div>
        <div className="game-info">
          <div style={{ font: 16 }}>{desc}</div>
          <div>{this.state.desc ? moves.reverse() : moves}</div>
          <button onClick={() => this.sortMoves()} style={{ margin: 20 }}>
            reserve
          </button>
        </div>
      </div>
    );
  }
}
