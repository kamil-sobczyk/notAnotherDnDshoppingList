const store = {
  items: [
    {
      name: "Bread",
      info: "Buy in Lidl",
      id: "0"
    },
    {
      name: "Cola",
      info: "",
      id: "1"
    },
    {
      name: "Milk",
      info: "Buy in Tesco",
      id: "2"
    },
    {
      name: "Beer",
      info: "",
      id: "3"
    },
    {
      name: "Beef",
      info: "1kg",
      id: "4"
    }
  ],
  selected: [
    {
      name: "Ham",
      info: "In slices",
      id: "5"
    },
    {
      name: "Rice",
      info: "",
      id: "6"
    },
    {
      name: "Potatoes",
      info: "Buy in Tesco",
      id: "7"
    },
    {
      name: "Aplles",
      info: "3kg",
      id: "8"
    }
  ],
  costs: []
};

const sortItemsByName = () =>
  store.items.sort((a, b) => a.name.localeCompare(b.name));

const appRouter = app => {
  app.get("/", (req, res) => {
    res.send("ShoppingList API!\n");
  });

  app.get("/store/items", (req, res) => {
    res.status(200).json(sortItemsByName());
  });
  app.post("/store/items", (req, res) => {
    store.items.push(req.body);
    res.status(200).json(sortItemsByName());
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
