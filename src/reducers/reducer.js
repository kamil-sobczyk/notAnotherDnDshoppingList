const reducer = (state, action) => {
  switch (action.type) {
    case "INFO_DIALOG":
      let index;
      action.index === undefined ? index = 0 : index = action.index;
      return {
        ...state,
        openInfo: state.openInfo ? false : true,
        activeInfo: index
      };
    case "ADD_DIALOG":
      return { ...state, openAdd: state.openAdd ? false : true };
    case "ADD_ITEM":
      return { ...state, list: [...state.list, action.newItem] };
    case "DELETE_ITEM":
    const newList = [...state.list.slice(0, action.index), ...state.list.slice(action.index + 1)];
      return {
        ...state,
        list: newList
      };
    case "HANDLE_CHECK":
      return { ...state, checked: action.newChecked };
    default:
      return state;
  }
};

export default reducer;
