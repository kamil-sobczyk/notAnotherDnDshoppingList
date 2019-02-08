
import { createStore } from "redux";

const initialState = () => {
    return {
      checked: '',
      openInfo: false,
      openAdd: false,
      newItem: "",
      newItemInfo: ""
    };
  };
  
  const store = createStore(initialState);

  export default store;