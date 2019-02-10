import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from './reducers/reducer';

import App from "./App";

const store = createStore(reducer, {
  checked: "",
  openInfo: false,
  openAdd: false,
  newItem: "",
  newItemInfo: ""
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
