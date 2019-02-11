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
      info: "000"
    },
    {
      name: "milk",
      info: "11111"
    },
    {
      name: "potatoes",
      info: "22222"
    },
    {
      name: "beer",
      info: "333333"
    }
  ],
  activeInfo: 0,
  checked: [0],
  openInfo: false,
  openAdd: false
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
