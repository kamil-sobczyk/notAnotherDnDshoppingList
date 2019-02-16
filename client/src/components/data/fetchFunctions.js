const getItems = dispatch => {
  fetch("/store/", {
    mode: "cors",
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(store => {
      return dispatch(store.items);
    });
};

const getSelected = dispatch => {
  fetch("/store/selected", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(checked => {
      return dispatch(checked);
    });
};

export { getItems, getSelected };
