import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducers/reducer";

import App from "./App";

const store = createStore(reducer, {
  list: [
    {
      name: "bread",
      info: "",
      checked: false
    },
    {
      name: "milk",
      info: "",
      checked: false
    },
    {
      name: "potatoes",
      info: "",
      checked: false
    },
    {
      name: "beer",
      info: "",
      checked: false
    }
  ],
  checked: [0],
  openInfo: false,
  openAdd: false,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
