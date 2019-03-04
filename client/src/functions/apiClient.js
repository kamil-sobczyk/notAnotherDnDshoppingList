// const server = "http://35.188.95.65";
const server = "http://0.0.0.0:8080";

const getItems = dispatch => {
  fetch(server + "/store/items", {
    mode: "cors",
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(items => {
      return dispatch(items);
    });
};

const getSelected = dispatch => {
  fetch(server + "/store/selected", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(selected => {
      return dispatch(selected);
    });
};

const changeItems = (dispatch, body) => {
  fetch(server + "/store/items", {
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
};
const changeSelected = (dispatch, body) => {
  console.log("b", body);
  fetch(server + "/store/selected", {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify(body)
  })
    .then(response => {
      console.log(response.json());
      return response.json();
    })
    // .then(res => res.text())
    // .then(text => console.log(text))
    .then(selected => {
      console.log("dsdd", selected);

      return dispatch(selected);
    })
    .catch(error => console.log("Ooops", error));
};

const addNewItem = (dispatch, body) => {
  fetch(server + "/store/items", {
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
};

const deleteItems = (dispatch, activeItem) => {
  fetch(server + "/store/items", {
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
};

const editItem = (newItem, activeItem) => {
  fetch(server + "/store/" + activeItem.list, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify({ activeItem: activeItem, newItem: newItem })
  })
    .then(response => {
      return response.json();
    })
    .then(state => {
      return state;
    })
    .catch(error => console.log("Ooops", error));
};

const getCosts = dispatch => {
  fetch(server + "/store/costs", {
    mode: "cors",
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(costs => {
      return dispatch(costs);
    });
};

const addCosts = (dispatch, costs) => {
  fetch(server + "/store/costs", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify(costs)
  })
    .then(response => {
      return response.json();
    })
    .then(state => {
      return dispatch(state);
    })
    .catch(error => console.log("Ooops", error));
};

export {
  getItems,
  getSelected,
  changeSelected,
  changeItems,
  addNewItem,
  deleteItems,
  editItem,
  getCosts,
  addCosts
};