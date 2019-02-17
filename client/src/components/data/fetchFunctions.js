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

const changeSelected = (dispatch, body) => {
    fetch("/store/selected/", {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify(body)
      })
        .then(response => {
          return response.json();
        })
        .then(selected => {
          return dispatch(selected);
        })
        .catch(error => console.log("Ooops", error));
}

export { getItems, getSelected, changeSelected };
