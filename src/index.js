import React from "react";
import ReactDOM from "react-dom";
import Board from "./pages/Board";
import { calculateWinner } from "./pages/Calculate";

import "./index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 采用数组记录每一步得棋盘
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
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ],
      count: 0,
      stepNumber: 0,
      xIsNext: true,
      desc: false,
    };
  }

  handleClick(i) {
    try {
      const history = this.state.history;
      // 当前棋盘与stepNumber相关
      const current = history[this.state.stepNumber];
      // 采用slice存储新数组
      const squares = current.squares.slice();
      const lists = this.state.lists;
      let count = this.state.count;
      // win或者点击格子有值不做操作
      if (calculateWinner(lists, squares)[1] || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat({
          squares: squares,
          step: i,
        }),
        count: count + 1,
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    } catch (error) {}
  }
  // 切换到历史记录
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
    const current = history[this.state.stepNumber];
    const { lists, count } = this.state;
    const winner = calculateWinner(lists, current.squares);
    let status = "";

    if (winner[1] && count !== 9) {
      status = "Winner is: " + winner[1];
    } else if (count === 9) {
      status = "平局";
    } else {
      status = "Next step is: " + (this.state.xIsNext ? "X" : "O");
    }
    // 通过数组map得方式输出时光机记录

    const moves = history.map((step, move) => {
      const axis =
        step.step === -1
          ? null
          : parseInt(step.step / 3 + 1) + "行" + ((step.step % 3) + 1) + "列";
      const desc = move
        ? "Go to move #" + move + "###" + axis
        : "Go to game start";
      let overstriking = "";
      if (move === history.length - 1) {
        overstriking = "overstriking";
      }
      return (
        <li key={move}>
          <button
            className={overstriking}
            onClick={() => {
              this.jumpTo(move);
            }}
          >
            {desc}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winner={winner[0]}
            onClick={(i) => {
              this.handleClick(i);
            }}
          ></Board>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.sortMoves()}>sort</button>
          <div>{this.state.desc ? moves.reverse() : moves}</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
