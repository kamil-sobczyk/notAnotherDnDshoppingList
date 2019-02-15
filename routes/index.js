let store = {
  list: [
    {
      name: "breadAPI",
      info: "Buy in Lidl"
    },
    {
      name: "milkAPI",
      info: ""
    },
    {
      name: "potatoesAPI",
      info: "Buy in Tesco"
    },
    {
      name: "beerAPI",
      info: ""
    },
    {
      name: "newBeerAPI",
      info: "damian"
    }
  ],
  checked: [
    {
      name: "newBeerAPI",
      info: "damian"
    }
  ]
};

const appRouter = app => {
  app.get("/", function(req, res) {
    res.status(200).send("Application API");
  });
  app.get("/store", (req, res) => {
    res.status(200).send(store);
  });
  app.get("/store/checked", (req, res) => {
    res.status(200).send(store.checked);
  });
  app.put("/store/checked", (req, res) => {
    store.checked.push(req.body);
    res.status(200).json(store.checked);
  });
  app.post("/store/list", (req, res) => {
    store.list.push(req.body);
    res.status(200).send(store.list);
  });
  app.put("/store/list", (req, res) => {
    store.list[req.body.index] = req.body.newItem;
    res.status(200).send(store.list);
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
