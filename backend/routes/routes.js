const store = {
  list: [
    {
      name: "bread",
      info: "Buy in Lidl"
    },
    {
      name: "milk",
      info: ""
    },
    {
      name: "potatoes",
      info: "Buy in Tesco"
    },
    {
      name: "beer",
      info: ""
    }
  ],
  activeInfo: 0,
  checked: [],
  openInfo: "false",
  openAdd: "false"
};

const appRouter = app => {
  app.get("/", function(req, res) {
    res.status(200).send("REST APIIII");
  });
  app.get("/store", (req, res) => {
    res.status(200).send(store);
  });
  app.get("/store/list", (req, res) => {
    res.status(200).send(store.list);
  });
  app.get("/store/openinfo", (req, res) => {
    res.status(200).send(store.openInfo);
  });
  app.get("/store/activeinfo", (req, res) => {
    res.status(200).send(store.activeInfo);
  });
  app.get("/store/checked", (req, res) => {
    res.status(200).send(store.checked);
  });
  app.get("/store/openadd", (req, res) => {
    res.status(200).send(store.openAdd);
  });
  app.post('/store/openadd', (req, res) => {
    res.status(200).send('111111');
  });
};

module.exports = appRouter;
