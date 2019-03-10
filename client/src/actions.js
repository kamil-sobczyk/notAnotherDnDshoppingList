const TOGGLE_SHOW_ITEMS = "TOGGLE_SHOW_ITEMS";
const TOGGLE_SHOW_ADD_DIALOG = "TOGGLE_SHOW_ADD_DIALOG";
const TOGGLE_SHOW_DELETE_DIALOG = "TOGGLE_SHOW_DELETE_DIALOG";
const TOGGLE_SHOW_EDIT_DIALOG = "TOGGLE_SHOW_EDIT_DIALOG";
const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const GET_ITEMS = "GET_ITEMS";
const GET_SELECTED = "GET_SELECTED";
const GET_COSTS = "GET_COSTS";
const ADD_COST = "ADD_COST";

const toggleShowItems = () => {
  return {
    type: TOGGLE_SHOW_ITEMS
  };
};
const toggleShowAddDialog = () => {
  return {
    type: TOGGLE_SHOW_ADD_DIALOG
  };
};
const toggleShowDeleteDialog = () => {
  return {
    type: TOGGLE_SHOW_DELETE_DIALOG
  };
};
const toggleShowEditDialog = () => {
  return {
    type: TOGGLE_SHOW_EDIT_DIALOG
  };
};
const addItem = item => {
  return {
    type: ADD_ITEM,
    newItem: item
  };
};
const deleteItem = activeItem => {
  return {
    type: DELETE_ITEM,
    index: activeItem.index
  };
};
const editItem = (newItem, activeItem) => {
  return {
    type: EDIT_ITEM,
    newItem: newItem,
    index: activeItem.index,
    list: activeItem.list
  };
};
const getItems = items => {
  return {
    type: GET_ITEMS,
    items
  };
};
const getSelected = selected => {
  return {
    type: GET_SELECTED,
    selected
  };
};
const getCosts = costs => {
    return {
        type: GET_COSTS,
        costs
    };
};
const addCost = costs => {
    return {
        type: ADD_COST,
        costs
    };
};

export {
  toggleShowItems,
  toggleShowAddDialog,
  toggleShowDeleteDialog,
  toggleShowEditDialog,
  addItem
};
