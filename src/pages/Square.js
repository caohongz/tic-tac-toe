import React, { Component } from "react";

export default class Square extends Component {
  render() {
    console.log("square", this.props.square);

    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.square}
      </button>
    );
  }
}
