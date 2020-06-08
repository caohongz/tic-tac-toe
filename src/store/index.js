import { createStore, combineReducers } from "redux";

export const tictactoeReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD":
      return state + payload;
  }
};

export default store = createStore(combineReducers({ home: tictactoeReducer }));
