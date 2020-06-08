// 计算是否获胜
export function calculateWinner(lists, squares) {
  for (let i = 0; i < lists.length; i++) {
    const [a, b, c] = lists[i];
    // 要考虑当前值是否存在
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [lists[i], squares[a]];
    }
  }
  return [[], null];
}
