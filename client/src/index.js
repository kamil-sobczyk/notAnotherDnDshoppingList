import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducer";

import App from "./App";

const store = createStore(reducer, {
  items: [],
  activeItem: {
    list: "items",
    index: 0
  },
  selected: [],
  openInfo: false,
  openAdd: false,
  openEdit: false,
  openDelete: false
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
