import React from "react";
import Board from "./pages/Board";
import { calculateWinner } from "./utils/";
import { connect } from "react-redux";

import "./index.css";

export default connect(
  ({ history }) => ({ history }),
  (dispatch) => ({
    click: (payload) => dispatch({ type: "CLICK", payload }),
    desc: () => dispatch({ type: "DESC" }),
    jumpTo: (payload) => dispatch({ type: "JUMPTO", payload }),
  })
)(
  class Game extends React.Component {
    handleClick(i) {
      const history = this.props.history;
      const current = history.history[history.stepNumber];
      const squares = current.squares.slice();
      if (calculateWinner(history.lists, current.squares)[1] || squares[i]) {
        return null;
      }
      squares[i] = history.xIsNext ? "X" : "O";
      console.log(squares);

      this.props.click({ squares, i });
    }
    render() {
      const { desc } = this.props.history;
      const history = this.props.history;
      console.log("desc", history);

      const current = history.history[history.stepNumber];

      let winner = calculateWinner(history.lists, current.squares);
      let status = "";
      const moves = history.history.map((step, move) => {
        const desc = move ? "Go to move #" + move : "Go to game start";
        return (
          <li key={move}>
            <button onClick={() => this.props.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      if (winner[1]) {
        status = "winner is: " + winner[1];
      } else {
        status = "next is: " + (history.xIsNext ? "X" : "O");
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              winner={winner[0]}
              onClick={(i) => this.handleClick(i)}
            />
            {/* <p>{this.props.show}</p> */}
          </div>

          <div className="game-info">
            <div>{status}</div>
            <div style={{ margin: 20 }}>
              <button onClick={() => this.props.desc()}>sort</button>
            </div>
            <div>{desc ? moves.reverse() : moves}</div>
          </div>
        </div>
      );
    }
  }
);
