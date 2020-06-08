import React from "react";
import Board from "./pages/Board";
import { calculateWinner } from "./utils/";
import { connect } from "react-redux";

import "./index.css";

export default connect(
  ({ state }) => ({ history: state.home }),
  {}
)(
  class Game extends React.Component {
    log;
    handleClick(i) {
      const lists = this.props.lists;
      const history = this.props.history;
      const current = history[this.props.stepNumber];
      const squares = current.squares.slice();
      let count = this.props.count;
      if (calculateWinner(lists, squares)[1] || squares[i]) {
        return;
      }
      squares[i] = this.props.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares,
            step: i,
          },
        ]),
        count: count + 1,
        stepNumber: history.length,
        xIsNext: !this.props.xIsNext,
      });
      console.log("count", count);
    }

    jumpTo(move) {
      const history = this.props.history;

      this.setState({
        history: history.splice(0, move + 1),
        stepNumber: move,
        xIsNext: move % 2 === 0,
      });
    }

    sortMoves() {
      this.setState({
        desc: !this.props.desc,
      });
    }

    render() {
      console.log("props", this.props);

      const history = this.props.history;
      const lists = this.props.lists;
      const current = history[this.props.stepNumber];
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
      } else if (this.props.count === 9) {
        status = "平局";
      } else {
        status = "Next player: " + (this.props.xIsNext ? "X" : "O");
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
            <div>{this.props.desc ? moves.reverse() : moves}</div>
          </div>
        </div>
      );
    }
  }
);
