const reducer = (state, action) => {
  switch (action.type) {
    case "INFO":
      console.log("INFO REDUCER");
      console.log(state.openInfo);
      return { ...state, openInfo: state.openInfo ? true : false };

    default:
      return state;
  }
};

export default reducer;
