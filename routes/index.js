const store = {
   "list": [
     {
       "name": "breadAPI",
       "info": "Buy in Lidl"
     },
     {
       "name": "milkAPI",
       "info": ""
     },
     {
       "name": "potatoesAPI",
       "info": "Buy in Tesco"
     },
     {
       "name": "beerAPI",
       "info": ""
     },
     {
      "name": "newBeerAPI",
      "info": "damian"
    }
   ],
   "activeInfo": 666,
   "checked": [],
   "openInfo": "false",
   "openAdd": "false"
 };
 
 const appRouter = app => {
   app.get("/", function(req, res) {
     res.status(200).send("REST API");
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
 };
 
 module.exports = appRouter;