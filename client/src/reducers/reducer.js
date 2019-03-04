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
        activeItem: { list: action.list, index: action.index, id: action.id }
      };
    case "ADD_ITEM":
      let newItems = state.items;
      newItems.push(action.newItem);
      return { ...state, items: newItems };
    case "DELETE_ITEM":
      newItems = state.items.filter(item => item.id !== action.id);
      return {
        ...state,
        items: newItems
      };
    case "EDIT_ITEM":
      const list = state[action.list];
      list[action.index].name = action.newItem.name;
      list[action.index].info = action.newItem.info;
      return { ...state, [action.list]: list };
    case "GET_ITEMS":
      newItems = action.items;
      newItems.forEach(item => (item.id = generateNewId()));
      return {
        ...state,
        items: newItems
      };
    case "GET_SELECTED":
      const newSelected = action.selected;
      newSelected.forEach(item => (item.id = generateNewId()));
      return { ...state, selected: newSelected };
    case "GET_COSTS":
      return { ...state, costs: action.costs };
    case "ADD_COST":
      const newCosts = state.costs;
      newCosts.push(action.cost);
      return { ...state, costs: newCosts };
    default:
      return state;
  }
};

export default reducer;
