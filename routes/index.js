let store = {
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
   "checked": [{
    "name": "newBeerAPI",
    "info": "damian"
  }],
 };
 
 const appRouter = app => {
   app.get("/", function(req, res) {
     res.status(200).send("REST API");
   });
   app.get("/store", (req, res) => {
     res.status(200).send(store);
   });
   app.get("/store/checked", (req, res) => {
     res.status(200).send(store.checked);
   });
   app.put("/store/checked", (req, res) => {
     store.checked.push(req.body)
    res.status(200).json(store.checked);
   })
 };
 
 module.exports = appRouter;