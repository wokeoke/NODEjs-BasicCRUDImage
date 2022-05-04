const express = require('express');
const router = express.Router();

// HOME PAGE
router.get('/', (req, res) => {
  res.render('index.ejs', { title: 'Home Page' });
});

// ADD USER PAGE
router.get('/add', (req, res) => {
  res.render('add_users.ejs', { title: 'Add Users' });
});

module.exports = router;
