import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducer";

import App from "./App";

// import Server from './server/index';

const store = createStore(reducer, {
  list: [
    {
      name: "bread",
      info: "Buy in Lidl"
    },
    {
      name: "milk",
      info: ""
    },
    {
      name: "potatoes",
      info: "Buy in Tesco"
    },
    {
      name: "beer",
      info: ""
    }
  ],
  activeInfo: 0,
  checked: [],
  openInfo: false,
  openAdd: false
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
