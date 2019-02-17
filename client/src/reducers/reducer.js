let newID = "99";

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
      case "EDIT_SELECTED":
      return { ...state, selected: action.selected };
    case "ADD_ITEM":
      let newList = state.items;
      let newItem = action.newItem;
      console.log('newitem before', newItem)
      newItem.id = newID;
      newList.push(newItem);
      console.log('newList', newList)
      newID = String(parseInt(newID) - 1);
      return {...state, items: newList} ;
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
