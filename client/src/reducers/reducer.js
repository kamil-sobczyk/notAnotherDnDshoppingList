import { generateNewId } from "../functions/moveFunctions";

const initialState = {
  items: [],
  selected: [],
  activeItem: {
    list: "items",
    index: 0
  },
  costs: [],
  openAdd: false,
  openEdit: false,
  openDelete: false,
  showItems: false
};

const reducer = (state = initialState, action) => {
  const { list, index, newItem, items, selected, cost, costs } = action;
  switch (action.type) {
    case "SHOW_ITEMS":
      return { ...state, showItems: state.showItems ? false : true };
    case "SHOW_ADD_DIALOG":
      return { ...state, openAdd: state.openAdd ? false : true };
    case "SHOW_DELETE_DIALOG":
      return {
        ...state,
        openDelete: state.openDelete ? false : true,
        activeItem: { list: list, index: index }
      };
    case "SHOW_EDIT_DIALOG":
      return {
        ...state,
        openEdit: state.openEdit ? false : true,
        activeItem: { list: list, index: index }
      };
    case "ADD_ITEM":
      let newItems = state.items;
      newItems.push(newItem);
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
      newItems = items;
      newItems.forEach(item => (item.id = generateNewId()));
      return {
        ...state,
        items: newItems
      };
    case "GET_SELECTED":
      const newSelected = selected;
      newSelected.forEach(item => (item.id = generateNewId()));
      return { ...state, selected: newSelected };
    case "GET_COSTS":
      return { ...state, costs: costs };
    case "ADD_COST":
      const newCosts = state.costs;
      newCosts.push(cost);
      return { ...state, costs: newCosts };
    default:
      return state;
  }
};

export default reducer;
