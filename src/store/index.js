import { createStore, combineReducers } from "redux";

const defaultState = {
  history: [{ squares: Array(9).fill(null), step: -1 }],
  lists: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  count: 0,
  stepNumber: 0,
  xIsNext: true,
  desc: false,
};
export const tictactoeReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case "CLICK":
      console.log("payload", state.history.length);
      // state.stepNumber = state.history.length;
      // state.history = state.history.concat([
      //   {
      //     squares: payload,
      //   },
      // ]);
      console.log("click", state);

      return Object.assign({}, state, {
        history: state.history.concat([
          {
            squares: payload.squares,
            step: payload.i,
          },
        ]),
        stepNumber: state.history.length,
        xIsNext: !state.xIsNext,
      });
    case "DESC":
      return Object.assign({}, state, {
        desc: !state.desc,
      });
    case "JUMPTO":
      return Object.assign({}, state, {
        history: state.history.slice(0, payload + 1),
        stepNumber: state.history.slice(0, payload + 1).length - 1,
        xIsNext: state.history.slice(0, payload + 1).length % 2 !== 0,
      });
    default:
      return state;
  }
};

const store = createStore(combineReducers({ history: tictactoeReducer }));
export default store;
