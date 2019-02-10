const reducer = (state, action) => {
    switch (action.type) {
      case "INFO":
      console.log(action.type)
        return { ...state, openInfo: (state.openInfo ? true : false) };
      default:
        return state;
    }
  };

  export default reducer;