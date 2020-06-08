import React from "react";
import Board from "./pages/Board";
import { calculateWinner } from "./utils/";
import "./index.css";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          step: -1,
        },
      ],
      lists: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
      ],
      count: 0,
      i: -1,
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const lists = this.state.lists;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    let count = this.state.count;
    if (calculateWinner(lists, squares)[1] || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          step: i,
        },
      ]),
      count: count + 1,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    console.log("count", count);
  }

  jumpTo(move) {
    const history = this.state.history;

    this.setState({
      history: history.splice(0, move + 1),
      stepNumber: move,
      xIsNext: move % 2 === 0,
    });
  }

  sortMoves() {
    this.setState({
      desc: !this.state.desc,
    });
  }

  render() {
    const history = this.state.history;
    const lists = this.state.lists;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(lists, current.squares);
    console.log("current", current.squares);

    const moves = history.map((step, move) => {
      let movePoint = "";
      if (move === history.length - 1) {
        movePoint = "overstriking";
      }
      const axis =
        step.step === -1
          ? null
          : parseInt(step.step / 3 + 1) + "行" + ((step.step % 3) + 1) + "列";
      const desc = move
        ? "Go to move #" + move + "###" + axis
        : "Go to game start";
      console.log("move:", move, " step: ", step);

      return (
        <li key={move}>
          <button className={movePoint} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    let status;
    if (winner[1]) {
      status = "Winner is " + winner[1];
    } else if (this.state.count === 9) {
      status = "平局";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winner={winner[0]}
            onClick={(i) => this.handleClick(i)}
          />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <div style={{ margin: 20 }}>
            <button onClick={() => this.sortMoves()}>sort</button>
          </div>
          <div>{this.state.desc ? moves.reverse() : moves}</div>
        </div>
      </div>
    );
  }
}
