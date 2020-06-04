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
        },
      ],
      stepNumber: 0,
      xIsNext: true,
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
      }),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  // 切换到历史记录
  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: move % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    console.log(current.squares);
    const winner = calculateWinner(current.squares);
    console.log(winner);
    let status = "";
    if (winner) {
      status = "Winner is: " + winner;
    } else {
      status = "Next step is: " + (this.state.xIsNext ? "X" : "O");
    }
    // 通过数组map得方式输出时光机记录
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button
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
          <div>{moves}</div>
        </div>
      </div>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i);
        }}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
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
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
