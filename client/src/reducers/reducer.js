const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_INFO_DIALOG":
      let index = 0;
      action.index ? (index = action.index) : (index = 0);
      return {
        ...state,
        openInfo: state.openInfo ? false : true,
        activeInfo: index
      };
    case "SHOW_ADD_DIALOG":
      return { ...state, openAdd: state.openAdd ? false : true };
      case "SHOW_DELETE_DIALOG":
      action.index ? (index = action.index) : (index = 0);
      return { ...state, openDelete: state.openDelete ? false : true, activeInfo: index };
    case "SHOW_EDIT_DIALOG":
      action.index ? (index = action.index) : (index = 0);
      return {
        ...state,
        openEdit: state.openEdit ? false : true,
        activeInfo: index
      };
    case "ADD_ITEM":
      let newList = state.list;
      newList.push(action.newItem);
      return { ...state, list: newList };
    case "DELETE_ITEM":
      newList = [
        ...state.list.slice(0, action.index),
        ...state.list.slice(action.index + 1)
      ];
      return {
        ...state,
        list: newList
      };
    case "EDIT_ITEM":
      newList = state.list;
      newList[action.index] = action.newItem;
      return { ...state, list: newList };
    case "GET_LIST":
      return { ...state, list: action.list };
    case "GET_CHECKED":
      return { ...state, checked: action.checked };
    case "HANDLE_CHECK":
      const newChecked = state.checked;
      newChecked.push(action.value);
      return { ...state, checked: newChecked };
    default:
      return state;
  }
};

export default reducer;
