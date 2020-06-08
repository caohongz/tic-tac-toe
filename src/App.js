import React from "react";
// import Board from "./pages/Board";
// import { calculateWinner } from "./utils/";
import { connect } from "react-redux";

import "./index.css";

export default connect(
  (state) => {
    return {
      loading: state.userData.loading,
    };
  },
  (dispatch) => {
    return {};
  }
)(
  class Game extends React.Component {
    render() {
      console.log("state", this.props);
      return (
        <div className="game">
          <div className="game-board">
            {/* <Board
              squares={current.squares}
              winner={winner[0]}
              onClick={(i) => this.handleClick(i)}
            /> */}
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
