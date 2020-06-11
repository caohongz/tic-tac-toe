import React, { Component } from "react";
import Square from "./Square";

export default class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        num={i}
        // winner={this.props.winner}
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i);
        }}
      />
    );
  }
  render() {
    let lists = [];
    let num = 0;
    for (let i = 0; i < 3; i++) {
      let lineRes = [];
      for (let j = 0; j < 3; j++) {
        let square = this.renderSquare(num);
        lineRes.push(square);
        num++;
      }
      lists.push(
        <div key={num} className="board-row">
          {lineRes}
        </div>
      );
    }
    return <div>{lists}</div>;
  }
}
