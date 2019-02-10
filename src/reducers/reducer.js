const reducer = (state, action) => {
  switch (action.type) {
    case "INFO_DIALOG":
    console.log(action);
      return { ...state, openInfo: state.openInfo ? false : true };
    case "ADD_DIALOG":
      return { ...state, openAdd: state.openAdd ? false : true };
    case "ADD_ITEM": 
    console.log('ADDDDD')
    const newList = state.list;
    newList.push(action.newItem);
    return { ...state, list: newList };
    default:
      return state;
  }
};

export default reducer;
