const TOGGLE_SHOW_ITEMS = "TOGGLE_SHOW_ITEMS";
const TOGGLE_SHOW_ADD_DIALOG = "TOGGLE_SHOW_ADD_DIALOG";
const TOGGLE_SHOW_DELETE_DIALOG = "TOGGLE_SHOW_DELETE_DIALOG";
const TOGGLE_SHOW_EDIT_DIALOG = "TOGGLE_SHOW_EDIT_DIALOG";

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
const toggleShowDeleteDialog = activeItem => {
  return {
    type: TOGGLE_SHOW_DELETE_DIALOG,
    index: activeItem.index,
    list: activeItem.list
  };
};
const toggleShowEditDialog = activeItem => {
  return {
    type: TOGGLE_SHOW_EDIT_DIALOG,
    index: activeItem.index,
    list: activeItem.list
  };
};

export {
  toggleShowItems,
  toggleShowAddDialog,
  toggleShowDeleteDialog,
  toggleShowEditDialog
};
