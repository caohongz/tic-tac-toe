import React, { Component } from "react";
import Square from "./Square";

export default class Board extends Component {
  renderSquare(j) {
    return (
      <Square
        key={j}
        i={j}
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
      for (let j = i; j < i + 3; j++) {
        let square = this.renderSquare(j);
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
