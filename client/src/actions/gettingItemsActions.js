const GET_ITEMS = "GET_ITEMS";
const GET_SELECTED = "GET_SELECTED";

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

export { getItems, getSelected };
