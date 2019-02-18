const store = {
  items: [
    {
      name: "111111",
      info: "Buy in Lidl",
      id: "0"
    },
    {
      name: "milkAPI",
      info: "",
      id: "1"
    },
    {
      name: "potatoesAPI",
      info: "Buy in Tesco",
      id: "2"
    },
    {
      name: "beerAPI",
      info: "",
      id: "3"
    },
    {
      name: "newBeerAPI",
      info: "damian",
      id: "4"
    }
  ],
  selected: [
    {
      name: "AAAAAAAA",
      info: "Buy in Tesco",
      id: "5"
    },
    {
      name: "pot selected",
      info: "Buy in Tesco",
      id: "6"
    },
    {
      name: "p selected",
      info: "Buy in Tesco",
      id: "7"
    },
    {
      name: "API selecteed",
      info: "Buy in Tesco",
      id: "8"
    }
  ]
};




const appRouter = app => {
  let newID = "9999";
  app.get("/", function(req, res) {
    res.status(200).send("Application API");
  });
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
  app.delete("/store/list", (req, res) => {
    store.list = [
      ...store.list.slice(0, req.body.index),
      ...store.list.slice(req.body.index + 1)
    ];
    res.status(200).send(store.list);
  });
};

module.exports = appRouter;
