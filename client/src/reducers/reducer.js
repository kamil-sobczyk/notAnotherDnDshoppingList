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
        activeItem: { list: action.list, index: action.index }
      };
    case "SHOW_EDIT_DIALOG":
      return {
        ...state,
        openEdit: state.openEdit ? false : true,
        activeItem: { list: action.list, index: action.index }
      };
    case "ADD_ITEM":
      let newList = state.items;
      let newItem = action.newItem;
      newList.push(newItem);
      return { ...state, items: newList };
    case "DELETE_ITEM":
      let newState = state;
      newState[action.list] = [
        ...state[action.list].slice(0, action.index),
        ...state[action.list].slice(action.index + 1)
      ];
      return {
        ...state,
        newState
      };
    case "EDIT_ITEM":
      newState = state;
      newState[action.list][action.index].name = action.newItem.name;
      newState[action.list][action.index].info = action.newItem.info;
      return { ...state, newState };
    case "GET_ITEMS":
      return {
        ...state,
        items: action.items.sort((a, b) => a.name.localeCompare(b.name))
      };
    case "GET_SELECTED":
      return { ...state, selected: action.selected };
    case "GET_COSTS":
    return { ...state, costs: action.costs}
    case "ADD_COST":
      const newCosts = state.costs;
      newCosts.push(action.cost);
      return { ...state, costs: newCosts };
    default:
      return state;
  }
};

export default reducer;
