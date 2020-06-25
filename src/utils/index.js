export function winnerCalulate(lists, squares) {
  for (let i = 0; i < lists.length; i++) {
    const [a, b, c] = lists[i];
    console.log("abc", lists[i], a, b, c);

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [lists[i], squares[a]];
    }
  }
}
