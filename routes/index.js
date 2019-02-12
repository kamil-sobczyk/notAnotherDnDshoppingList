const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.render('home');
});

router.get('/new', (req, res) => {
    res.render('new');
 });

module.exports = router;