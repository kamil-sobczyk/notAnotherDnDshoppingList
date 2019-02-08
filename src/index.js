import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import App from "./App";
import store from './store';

function reducer(state, action) {
  if (action.type === "changeState") {
    return action.payload.newState;
  }
  return "State";
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
