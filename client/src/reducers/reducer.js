const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ADD_DIALOG":
      let index = 0;
      return { ...state, openAdd: state.openAdd ? false : true };
    case "SHOW_DELETE_DIALOG":
      return {
        ...state,
        openDelete: state.openDelete ? false : true,
        activeItem: { list: action.list, index: action.index }
      };
    case "SHOW_EDIT_DIALOG":
    return {
      ...state,
      openEdit: state.openEdit ? false : true,
      activeItem: { list: action.list, index: action.index }
    };
    case "EDIT_SELECTED":
      return { ...state, selected: action.selected };
    case "ADD_ITEM":
      let newList = state.items;
      let newItem = action.newItem;
      newList.push(newItem);
      return { ...state, items: newList };
    case "DELETE_ITEM":
      const newState = state;
      newState[action.list] = [
        ...state[action.list].slice(0, action.index),
        ...state[action.list].slice(action.index + 1)
      ];
      return {
        ...state,
        newState
      };
    case "EDIT_ITEM":
      newList = state.list;
      newList[action.index] = action.newItem;
      return { ...state, list: newList };
    case "GET_ITEMS":
      return { ...state, items: action.items };
    case "GET_SELECTED":
      return { ...state, selected: action.selected };
    case "HANDLE_CHECK":
      const newChecked = state.checked;
      newChecked.push(action.value);
      return { ...state, checked: newChecked };
    default:
      return state;
  }
};

export default reducer;
