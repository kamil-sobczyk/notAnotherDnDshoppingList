const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ITEMS":
      return { ...state, showItems: state.showItems ? false : true };
    case "SHOW_ADD_DIALOG":
      return { ...state, openAdd: state.openAdd ? false : true };
    case "SHOW_DELETE_DIALOG":
      return {
        ...state,
        openDelete: state.openDelete ? false : true,
        activeItem: { list: action.list, index: action.index, id: action.id }
      };
    case "SHOW_EDIT_DIALOG":
      return {
        ...state,
        openEdit: state.openEdit ? false : true,
        activeItem: { list: action.list, index: action.index }
      };
    case "ADD_ITEM":
      state.items.push(action.newItem);
      return { ...state, items: state.items };
    case "DELETE_ITEM":
      state.items.forEach((item, index) => {
        if (item.id === action.id) {
          state.items.splice(index, 1);
        }
      });
      return {
        ...state
      };
    case "EDIT_ITEM":
      state[action.list][action.index].name = action.newItem.name;
      state[action.list][action.index].info = action.newItem.info;
      return { ...state };
    case "GET_ITEMS":
      return {
        ...state,
        items: action.items
      };
    case "GET_SELECTED":
      return { ...state, selected: action.selected };
    case "GET_COSTS":
      return { ...state, costs: action.costs };
    case "ADD_COST":
      state.costs.push(action.cost);
      return { ...state, costs: state.costs };
    default:
      return state;
  }
};

export default reducer;
