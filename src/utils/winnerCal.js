export function winnerCal(squares) {
  let lists = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [0, 3, 6],
  ];
  for (let i = 0; i < lists.length; i++) {
    const [a, b, c] = lists[i];
    // console.log("cal", squares);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [lists[i], squares[a]];
    }
  }
}
