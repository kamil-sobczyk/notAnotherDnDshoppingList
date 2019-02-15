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
<<<<<<< HEAD
     store.checked.push(req.body)
=======
    //  console.log('req', req)
     console.log('res', res)

>>>>>>> b2f4af8d19b819c7f7d589c7b2001a4783b1b240
    res.status(200).json(store.checked);
   })
 };
 
 module.exports = appRouter;