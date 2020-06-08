import { createStore, combineReducers } from "redux";

// const gameState = {
//   history: [
//     {
//       squares: [null, null, null, null, null, null, null, null, null],
//       step: -1,
//     },
//   ],
//   lists: [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 4, 8],
//     [1, 4, 7],
//     [2, 5, 8],
//     [2, 4, 6],
//   ],
//   count: 0,
//   i: -1,
//   xIsNext: true,
//   stepNumber: 0,
// };
const taskListData = {
  loading: true,
  error: false,
  taskList: [],
};

export const tictactoeReducer = (
  state = { taskListData },
  // state = { count: 0 },
  { type }
) => {
  switch (type) {
    case "SHOW":
      return { ...state };
  }
};

const store = createStore(tictactoeReducer);
export default store;
