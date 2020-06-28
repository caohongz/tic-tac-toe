import React, { Component } from "react";
import Square from "./Square";

export default class Board extends Component {
  renderSquare(j, winner) {
    return (
      <Square
        key={j}
        i={j}
        winner={winner}
        square={this.props.squares[j]}
        onClick={() => {
          this.props.onClick(j);
        }}
      />
    );
  }

  render() {
    let list = [];
    for (let i = 0; i < 9; i += 3) {
      let lineRes = [];
      let winner = false;
      for (let j = i; j < i + 3; j++) {
        if (this.props.winner && this.props.winner.indexOf(j) !== -1) {
          winner = true;
          console.log("winner", this.props.winner, j);
        } else {
          winner = false;
        }
        let square = this.renderSquare(j, winner);
        lineRes.push(square);
      }
      list.push(
        <div className="board-row" key={i}>
          {lineRes}
        </div>
      );
    }

    return <div>{list}</div>;
  }
}
