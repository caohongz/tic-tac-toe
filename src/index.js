import React from "react";
import ReactDOM from "react-dom";
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
      stepNumber: 0,
      xIsNext: true,
      desc: false,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    // 当前棋盘与stepNumber相关
    const current = history[this.state.stepNumber];
    // 采用slice存储新数组
    const squares = current.squares.slice();
    // win后者点击格子有值不做操作
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({
        squares: squares,
        step: i,
      }),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  // 切换到历史记录
  jumpTo(move) {
    const history = this.state.history;
    console.log("map:", history);
    console.log("jump", move);
    console.log("cal", history.slice(0, move + 1));

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
    console.log("current", history);
    console.log("current1", this.state.stepNumber, current);
    const winner = calculateWinner(current.squares);
    console.log(winner);
    let status = "";
    if (winner) {
      status = "Winner is: " + winner[1];
    } else {
      status = "Next step is: " + (this.state.xIsNext ? "X" : "O");
    }
    // 通过数组map得方式输出时光机记录
    console.log("map history", history);

    const moves = history.map((step, move) => {
      const axis =
        step.step === -1
          ? null
          : parseInt(step.step / 3 + 1) + "行" + ((step.step % 3) + 1) + "列";
      console.log("step", axis);
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

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
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
      console.log(lists);
    }
    return <div>{lists}</div>;
  }
}
// 改为函数式组件
function Square(props) {
  // console.log(props);

  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
// 计算是否获胜
function calculateWinner(squares) {
  const lists = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lists.length; i++) {
    const [a, b, c] = lists[i];
    // 要考虑当前值是否存在
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [lists[i], squares[a]];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
