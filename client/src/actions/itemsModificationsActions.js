const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const EDIT_ITEM = "EDIT_ITEM";

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
    newItem,
    index: activeItem.index,
    list: activeItem.list
  };
};

export { addItem, deleteItem, editItem };
