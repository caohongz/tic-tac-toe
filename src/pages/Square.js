import React, { Component } from "react";

export default class Square extends Component {
  render() {
    return (
      <button
        className={this.props.winner ? "winner-square" : "square"}
        onClick={this.props.onClick}
      >
        {this.props.square}
      </button>
    );
  }
}
