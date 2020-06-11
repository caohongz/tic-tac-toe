import React from "react";
import Board from "./pages/Board";
// import { calculateWinner } from "./utils/";
import { connect } from "react-redux";

import "./index.css";

export default connect(
  ({ history }) => ({ history }),
  (dispatch) => ({
    click: (payload) => dispatch({ type: "CLICK", payload }),
  })
)(
  class Game extends React.Component {
    handleClick(i) {
      const history = this.props.history;
      const current = history.history[history.stepNumber];
      const squares = current.squares.slice();
      squares[i] = "X";
      console.log(squares);

      this.props.click(squares);
    }
    render() {
      const history = this.props.history;
      const current = history.history[history.stepNumber];
      console.log("state", history.stepNumber, current);

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              // winner={winner[0]}
              onClick={(i) => this.handleClick(i)}
            />
            {/* <p>{this.props.show}</p> */}
          </div>

          <div className="game-info">
            {/* <div>{status}</div>
            <div style={{ margin: 20 }}>
              <button onClick={() => this.sortMoves()}>sort</button>
            </div>
            <div>{this.props.desc ? moves.reverse() : moves}</div> */}
          </div>
        </div>
      );
    }
  }
);
