import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";

const reducer = (state, action) => {
  switch (action.type) {
    case "INFO":
    console.log(action.type)
      return { ...state, openInfo: (state.openInfo = false ? true : false) };
    default:
      return state;
  }
};

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
