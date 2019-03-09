import { sortItemsByName } from "../functions/reorderFunctions";

const initialState = {
  items: [],
  selected: [],
  costs: [],
  activeItem: {
    list: "items",
    index: 0
  },
  openAdd: false,
  openEdit: false,
  openDelete: false,
  showItems: false
};

const reducer = (state = initialState, action) => {
  const { list, index, newItem, items, selected, cost, costs } = action;
  switch (action.type) {
    case "TOGGLE_SHOW_ITEMS":
      return { ...state, showItems: state.showItems ? false : true };
    case "TOGGLE_SHOW_ADD_DIALOG":
      return { ...state, openAdd: state.openAdd ? false : true };
    case "TOGGLE_SHOW_DELETE_DIALOG":
      return {
        ...state,
        openDelete: state.openDelete ? false : true,
        activeItem: { list, index }
      };
    case "TOGGLE_SHOW_EDIT_DIALOG":
      return {
        ...state,
        openEdit: state.openEdit ? false : true,
        activeItem: { list, index }
      };
    case "ADD_ITEM":
      let newItems = state.items;
      newItems.push(newItem);
      sortItemsByName(newItems);
      return { ...state, items: newItems };
    case "DELETE_ITEM":
      newItems = state.items.filter((item, itemIndex) => itemIndex !== index);
      return {
        ...state,
        items: newItems
      };
    case "EDIT_ITEM":
      const newList = state[list];
      newList[index].name = newItem.name;
      newList[index].info = newItem.info;
      return { ...state, [list]: newList };
    case "GET_ITEMS":
      return {
        ...state,
        items: items
      };
    case "GET_SELECTED":
      return { ...state, selected };
    case "GET_COSTS":
      return { ...state, costs };
    case "ADD_COST":
      const newCosts = state.costs;
      newCosts.push(cost);
      return { ...state, costs: newCosts };
    default:
      return state;
  }
};

export default reducer;
