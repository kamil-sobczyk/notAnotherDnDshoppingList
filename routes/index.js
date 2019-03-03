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

const appRouter = app => {
  app.get("/", (req, res) => {
    res.send("ShoppingList API\n");
  });
  let newID = "9999";
  app.get("/store", (req, res) => {
    res.status(200).send(store);
  });
  app.get("/store/selected", (req, res) => {
    res.status(200).send(store.selected);
  });
  app.put("/store/selected", (req, res) => {
    store.selected = req.body;
    res.status(200).json(store.selected);
  });
  app.post("/store/items", (req, res) => {
    let newItem = req.body;
    newItem.id = newID;
    newID = String(parseInt(newID) - 1);
    store.items.push(newItem);
    res.status(200).json(newItem);
  });
  app.put("/store/items", (req, res) => {
    store.items = req.body;
    res.status(200).send(store.items);
  });
  app.put("/store", (req, res) => {
    let newItem = req.body.newItem;
    let activeItem = req.body.activeItem;
    newItem.id = newID;
    newID = String(parseInt(newID) - 1);
    store[activeItem.list][activeItem.index] = newItem;
    res.status(200).send(store);
  });
  app.delete("/store", (req, res) => {
    store.items.filter(item => item.id !== req.body.id);
    res.status(200).send(store);
    });
  app.get("/store/costs", (req, res) => {
    res.status(200).send(store.costs);
  });
  app.post("/store/costs", (req, res) => {
    store.costs.push(req.body);
    res.status(200).json(store.costs);
  });
};

module.exports = appRouter;
