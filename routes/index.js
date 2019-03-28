const store = {
  items: [
    {
      name: "Bread",
      info: "Buy in Lidl",
      id: "sdfsdfsadfsdfdsf",
      checked: false
    },
    {
      name: "Cola",
      info: "",
      id: "gfvfsddwed",
      checked: false
    },
    {
      name: "Milk",
      info: "Buy in Tesco",
      id: "324rijdsojfddsaoid",
      checked: false
    },
    {
      name: "Beer",
      info: "",
      id: "fdswefi343fdsdf",
      checked: false
    },
    {
      name: "Beef",
      info: "1kg",
      id: "frefp43ifjdsfs",
      checked: false
    }
  ],
  selected: [
    {
      name: "Ham",
      info: "In slices",
      id: "43rpijdskjfna",
      checked: false
    },
    {
      name: "Rice",
      info: "",
      id: "e3rijfisdnc.kas3",
      checked: false
    },
    {
      name: "Potatoes",
      info: "Buy in Tesco",
      id: "43ifpjsdljnfew33",
      checked: false
    },
    {
      name: "Aples",
      info: "3kg",
      id: "ekflkdsdsaljd",
      checked: false
    }
  ],
  costs: []
};

const sortItemsByName = () =>
  store.items.sort((a, b) => a.name.localeCompare(b.name));

const sortSelectedByCheckedValue = () => {
  let checkedItems = [];
  let uncheckedItems = [];
  store.selected.forEach(item =>
    item.checked ? checkedItems.push(item) : uncheckedItems.push(item)
  );
  store.selected = [...checkedItems, ...uncheckedItems];
};

const appRouter = app => {
  app.get("/", (req, res) => {
    res.send("ShoppingList API!\n");
  });

  app.get("/store/items", (req, res) => {
    sortItemsByName();
    res.status(200).send(store.items);
  });
  app.post("/store/items", (req, res) => {
    store.items.push(req.body);
    sortItemsByName();
    res.status(200).send(store.items);
  });
  app.put("/store/items", (req, res) => {
    store.items = req.body;
    res.status(200).json(store.items);
  });
  app.delete("/store/items", (req, res) => {
    store.items.splice(req.body.index, 1);
    res.status(200).json(store.items);
  });

  app.get("/store/selected", (req, res) => {
    sortSelectedByCheckedValue();
    res.status(200).json(store.selected);
  });
  app.put("/store/selected", (req, res) => {
    store.selected = req.body;
    res.status(200).json(store.selected);
  });

  app.get("/store/costs", (req, res) => {
    res.status(200).json(store.costs);
  });
  app.post("/store/costs", (req, res) => {
    store.costs.push(req.body);
    res.status(200).json(store.costs);
  });

  app.put("/store", (req, res) => {
    const { list, index } = req.body.activeItem;
    store[list][index] = req.body.newItem;
    res.status(200).json(store);
  });
};

module.exports = appRouter;
