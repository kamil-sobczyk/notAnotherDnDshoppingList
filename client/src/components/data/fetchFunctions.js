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

const changeItems = (dispatch, body) =>{
  fetch("/store/items", {
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
    .then(items => {
      return dispatch(items);
    })
  .catch(error => console.log("Ooops", error));
}
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

const addNewItem = (dispatch, body) => {
  fetch("/store/items", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json();
    })
    .then(item => {
      return dispatch(item);
    })
    .catch(error => console.log("Ooops", error));
}

const deleteItems = (dispatch, activeItem) => {
  fetch("/store/", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify(activeItem)
  })
    .then(response => {
      return response.json();
    })
    .then(state => {
      return state;
    })
    .catch(error => console.log("Ooops", error));
}
export { getItems, getSelected, changeSelected, changeItems, addNewItem, deleteItems };
