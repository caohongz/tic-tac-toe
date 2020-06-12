import { createStore, combineReducers } from "redux";

const defaultState = {
  history: [{ squares: Array(9).fill(null) }],
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
            squares: payload,
          },
        ]),
        stepNumber: state.history.length,
        xIsNext: !state.xIsNext,
      });

    default:
      return state;
  }
};

const store = createStore(combineReducers({ history: tictactoeReducer }));
export default store;
