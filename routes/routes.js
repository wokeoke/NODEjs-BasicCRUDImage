const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');

// IMAGE UPLOAD
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single('image');

// insert a user into database route
router.post('/add', upload, (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.filename,
  });

  user.save((err) => {
    if (err) {
      res.json({ message: err.message, type: 'danger' });
    } else {
      req.session.message = {
        type: 'success',
        message: 'User added successfully!',
      };
      res.redirect('/');
    }
  });
});

// HOME PAGE
router.get('/', (req, res) => {
  res.render('index.ejs', { title: 'Home Page' });
});

// ADD USER PAGE
router.get('/add', (req, res) => {
  res.render('add_users.ejs', { title: 'Add Users' });
});

module.exports = router;
