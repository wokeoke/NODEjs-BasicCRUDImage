## NODEjs Basic Crud Application with Image

---

### Video Tutorial

#### CRUD App Node Js, Express, MongoDB & EJS Templating Engine

```
https://www.youtube.com/playlist?list=PL6u82dzQtlfvJoAWdyf5mUxPQRnNKCMGt
```

---

#### Install Dependencies

```sh
npm install
```

#### Start Server

```sh
npm start
```

---

#### .env

```
PORT = 5000
DB_URI =
```

---

### Project Structure

```sh
root
├── .env
├── main.js
├── README.md
│
├── models
│   └── users.js
│
├── routes
│   └── routes.js
│
└── views
    ├── layout
    │   ├── footer.ejs
    │   └── header.ejs
    │
    ├── add_users.ejs
    └── index.ejs
```

---

### Create Server

- main.js
- Terminal **npm start**

```js
// import
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('BASIC CRUD APP WITH IMAGE');
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
```

---

### Database Connection

- main.js

```js
const PORT = process.env.PORT || 4000;
.
.
// database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
});
db.once('open', () => {
  console.log('Connected to the Database!');
});
```

---

### Middlewares

- main.js

```js
// database connection
.
.
// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// set template engine
app.set('view engine', 'ejs');

```

---

### User Model

- users.js
- Path models/users.js

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('User', userSchema);
```

---

### Routes

- routes.js
- Path routes/routes.js

```js
const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.send('All Users');
});

module.exports = router;
```

- main.js

```js
// set template engine
.
.
// route prefix
app.use('/', require('./routes/routes'));
```

---

### EJS

- index.ejs
- Path views/index.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title><%= title %></title>

    <!-- STYLE -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.0-beta2/css/bootstrap.min.css"
      integrity="sha512-aqT9YD5gLuLBr6ipQAS+72o5yHKzgZbGxEh6iY8lW/r6gG14e2kBTAJb8XrxzZrMOgSmDqtLaF76T0Z6YY2IHg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
      integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </head>

  <!-- BODY -->
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <!-- LOGO -->
        <a href="/" class="navbar-brand">
          <i class="fas fa-code me-2"></i>NODEjs-CRUD
        </a>

        <button
          class="navbar-toggler"
          data-bs-target="#my-nav"
          data-bs-toggle="collapse"
          aria-controls="my-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- NAVIGATION LINKS -->
        <div id="my-nav" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <!-- HOME LINK -->
            <li class="nav-item active">
              <a href="/" class="nav-link">
                <i class="fas fa-home me-1"></i>Home
              </a>
            </li>

            <!-- ADD USER LINK -->
            <li class="nav-item active">
              <a href="/add" class="nav-link">
                <i class="fas fa-user-plus me-1"></i>Add User
              </a>
            </li>

            <!-- ABOUT LINK -->
            <li class="nav-item active">
              <a href="#" class="nav-link">
                <i class="fas fa-globe me-1"></i>About
              </a>
            </li>

            <!-- CONTACT LINK -->
            <li class="nav-item active">
              <a href="#" class="nav-link">
                <i class="fas fa-envelope me-1"></i>Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- SCRIPT -->
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.0-beta2/js/bootstrap.bundle.min.js"
      integrity="sha512-43iShtbiyImxjjU4a9rhXBy7eKtIsrpll8xKhe1ghKqh5NyfME8phZs5JRFZpRBe1si44WM3tNmnqMym7JRmDQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
  </body>
</html>
```

- routes.js

```js
const express = require('express');
const router = express.Router();

// HOME PAGE
router.get('/', (req, res) => {
  res.render('index.ejs', { title: 'Home Page' });
});

module.exports = router;
```

---

### Add Users Page

- #### header.ejs
- Path views/layout/header.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title><%= title %></title>

    <!-- STYLE -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.0-beta2/css/bootstrap.min.css"
      integrity="sha512-aqT9YD5gLuLBr6ipQAS+72o5yHKzgZbGxEh6iY8lW/r6gG14e2kBTAJb8XrxzZrMOgSmDqtLaF76T0Z6YY2IHg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
      integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </head>

  <!-- BODY -->
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <!-- LOGO -->
        <a href="/" class="navbar-brand">
          <i class="fas fa-code me-2"></i>NODEjs-CRUD
        </a>

        <button
          class="navbar-toggler"
          data-bs-target="#my-nav"
          data-bs-toggle="collapse"
          aria-controls="my-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- NAVIGATION LINKS -->
        <div id="my-nav" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <!-- HOME LINK -->
            <li class="nav-item active">
              <a href="/" class="nav-link">
                <i class="fas fa-home me-1"></i>Home
              </a>
            </li>
            <!-- ADD USER LINK -->
            <li class="nav-item active">
              <a href="/add" class="nav-link">
                <i class="fas fa-user-plus me-1"></i>Add User
              </a>
            </li>
            <!-- ABOUT LINK -->
            <li class="nav-item active">
              <a href="#" class="nav-link">
                <i class="fas fa-globe me-1"></i>About
              </a>
            </li>
            <!-- CONTACT LINK -->
            <li class="nav-item active">
              <a href="#" class="nav-link">
                <i class="fas fa-envelope me-1"></i>Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- REMOVE </body> & </html> -->
    <!-- </body> </html> from footer.ejs -->
  </body>
</html>
```

- #### footer.ejs
- Path views/layout/footer.ejs

```html
    <!-- SCRIPT -->
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.0-beta2/js/bootstrap.bundle.min.js"
      integrity="sha512-43iShtbiyImxjjU4a9rhXBy7eKtIsrpll8xKhe1ghKqh5NyfME8phZs5JRFZpRBe1si44WM3tNmnqMym7JRmDQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
  </body>
</html>

```

- #### index.ejs
- Path views/index.ejs

```html
<%- include('layout/header.ejs') %>

<div class="container">
  <div class="row">
    <div class="col-lg-12">
      <h1>Home Page Content</h1>
    </div>
  </div>
</div>

<%- include('layout/footer.ejs') %>
```

- #### add_users.ejs
- Path views/add_users.ejs

```html
<%- include('layout/header.ejs') %>

<div class="container">
  <div class="row">
    <div class="col-lg-12">
      <h1>Add Users Page</h1>
    </div>
  </div>
</div>

<%- include('layout/footer.ejs') %>
```

- #### routes.js

```js
// HOME PAGE
.
.
// ADD USER PAGE
router.get('/add', (req, res) => {
  res.render('add_users.ejs', { title: 'Add Users' });
});
```

---

### Add New Users Form

- add_users.ejs

```html
<%- include('layout/header.ejs') %>

<div class="container">
  <div class="row">
    <div class="col-lg-6 mx-auto mt-4">
      <div class="card shadow">
        <!-- CARD HEADER -->
        <div class="card-header bg-primary">
          <h3 class="text-light">Add New User</h3>
        </div>

        <!-- FORM HANDLING -->
        <div class="card-body p-4">
          <form
            action="/add"
            method="post"
            id="add-form"
            enctype="multipart/form-data"
          >
            <!-- NAME INPUT -->
            <div class="mb-3">
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                class="form-control form-control-lg"
                placeholder="Enter name"
                required
              />
            </div>

            <!-- EMAIL INPUT -->
            <div class="mb-3">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                class="form-control form-control-lg"
                placeholder="Enter email"
                required
              />
            </div>

            <!-- PHONE INPUT -->
            <div class="mb-3">
              <label for="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                class="form-control form-control-lg"
                placeholder="Enter phone"
                required
              />
            </div>

            <!-- IMAGE INPUT -->
            <div class="mb-3">
              <label for="image" class="form-label">Select Image</label>
              <input
                type="file"
                name="image"
                class="form-control form-control-lg"
                required
              />
            </div>

            <!-- SUBMIT BUTTON -->
            <div class="mb-3 d-grid">
              <input
                type="submit"
                name="submit"
                value="Add User"
                class="btn btn-primary btn-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<%- include('layout/footer.ejs') %>
```

---

### Homepage Table

- index.ejs

```html
<%- include('layout/header.ejs') %>

<div class="container">
  <div class="row my-4">
    <div class="col-lg-12">
      <div class="table-responsive">
        <table class="table table-striped text-center">
          <!-- TABLE HEAD -->
          <thead>
            <tr class="table-dark">
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>E-Mail</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <!-- TABLE BODY -->
          <tbody>
            <tr>
              <td>1</td>
              <td><img src="" alt="" /></td>
              <td>John Doe</td>
              <td>john@email.com</td>
              <td>1234567</td>
              <td>
                <a href="#" class="text-success">
                  <i class="fas fa-edit fa-lg mx-1"></i>
                </a>

                <a href="#" class="text-danger">
                  <i class="fas fa-trash fa-lg mx-1"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<%- include('layout/footer.ejs') %>
```

---

### Create New User

- #### routes.js
- Add multer to upload an image to storage
- create uploads folder on root to store image
- .single('image') from input's **name** attribute
  \<input type="file" **name="image"** class="form-control form-control-lg" required />

```js
.
.
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
```

- #### routes.js
- after multer method, create post request

```js
// POST a new user into database route
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
```

- #### index.ejs
- Create alert when data is successfully added to the database

```html
<!-- <div class="row my-4"> -->

<div class="col-lg-12">
  <div <% if (message) { %>
    class="alert alert-dismissible fade show alert-<%= message.type %>"
    role="alert" >
    <button
      class="btn-close"
      type="button"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
    <strong> <%= message.message %> </strong>
  </div>
  <% } %>

  <!-- <div class="table-responsive"> -->
</div>
```

---

### GET All Users

- #### routes.js

```js
.
.
// HOME PAGE
// GET all users route
router.get('/', (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render('index.ejs', {
        title: 'Home Page',
        users: users,
      });
    }
  });
});
```

- #### index.ejs
- if else statement to create conditions
- <% **if (users != '')** { %>
  **SHOW TABLE**
  <% } else { %>
  **USERS NOT FOUND**
  <% } %>

####

- forEach method to unwrap users data
- <% **users.forEach**((user, index) => { %>
  \<td><%= user.name %>\</td>
  <% }) %>

```html
<!-- <% } %> -->

<div class="table-responsive">
  <% if (users != '') { %>
  <table class="table table-striped text-center my-3">
    <!-- TABLE HEAD -->
    <thead>
      <tr class="table-dark">
        <th>ID</th>
        <th>Image</th>
        <th>Name</th>
        <th>E-Mail</th>
        <th>Phone</th>
        <th>Action</th>
      </tr>
    </thead>

    <!-- TABLE BODY -->
    <tbody>
      <% users.forEach((user, index) => { %>
      <tr class="align-middle">
        <td><%= index %></td>
        <td>
          <img
            src="<%= user.image %>"
            alt="<%= user.name %>"
            width="50"
            class="img-thumbnail"
          />
        </td>
        <td><%= user.name %></td>
        <td><%= user.email %></td>
        <td><%= user.phone %></td>
        <td>
          <a href="/edit/<%= user._id %>" class="text-success">
            <i class="fas fa-edit fa-lg mx-1"></i>
          </a>

          <a href="/delete/<%= user._id %>" class="text-danger">
            <i class="fas fa-trash fa-lg mx-1"></i>
          </a>
        </td>
      </tr>
      <% }) %>
    </tbody>
  </table>
  <% } else { %>
  <h1 class="text-center text-secondary mt-5">
    No users found in the database
  </h1>
  <% } %>
</div>

<!-- </div> -->
```

- #### main.js
- Create static folder for uploads to show image

```js
// middlewares
.
.
// create static folder for uploads
app.use(express.static('./uploads'));
```

- #### Pagination

```url
https://datatables.net/download/
```

- Step 1. Choose a styling framework
  - Bootstrap 4
- Step 2. Select packages
  - DataTables
- Step 3. Pick a download method

  - CDN
  - Minify
  - Concatenate

- Copy \<link> & \<script> tag and paste in header & footer

```html
<!-- PASTE IN HEADER -->
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.datatables.net/v/bs4/dt-1.11.5/datatables.min.css"
/>

<!-- PASTE IN FOOTER -->
<script
  type="text/javascript"
  src="https://cdn.datatables.net/v/bs4/dt-1.11.5/datatables.min.js"
></script>
```

- #### header.ejs

```html
<!-- font-awesome -->

<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.datatables.net/v/bs4/dt-1.11.5/datatables.min.css"
/>
```

- #### footer.ejs

```html
<!-- SCRIPT -->
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
  integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>

<!-- twitter-bootstrap -->

<script
  type="text/javascript"
  src="https://cdn.datatables.net/v/bs4/dt-1.11.5/datatables.min.js"
></script>

<script>
  $(document).ready(function () {
    $('table').DataTable({
      order: [0, 'desc'],
    });
  });
</script>
```

---

### GET Single User Data

- #### edit_users.ejs
- Path views/layout/edit_users.ejs

```html
<%- include('layout/header.ejs') %>

<div class="container">
  <div class="row">
    <div class="col-lg-6 mx-auto mt-4">
      <div class="card shadow">
        <!-- CARD HEADER -->
        <div class="card-header bg-success">
          <h3 class="text-light">Edit User : <%= user.name %></h3>
        </div>

        <!-- FORM HANDLING -->
        <div class="card-body p-4">
          <form
            action="/update/<%= user._id %>"
            method="post"
            id="add-form"
            enctype="multipart/form-data"
          >
            <!-- NAME INPUT -->
            <div class="mb-3">
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                class="form-control form-control-lg"
                placeholder="Enter name"
                value="<%= user.name %>"
                required
              />
            </div>

            <!-- EMAIL INPUT -->
            <div class="mb-3">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                class="form-control form-control-lg"
                placeholder="Enter email"
                value="<%= user.email %>"
                required
              />
            </div>

            <!-- PHONE INPUT -->
            <div class="mb-3">
              <label for="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                class="form-control form-control-lg"
                placeholder="Enter phone"
                value="<%= user.phone %>"
                required
              />
            </div>

            <!-- IMAGE INPUT -->
            <div class="mb-3">
              <label for="image" class="form-label">Select Image</label>
              <input
                type="file"
                name="image"
                class="form-control form-control-lg"
                required
              />
              <img
                src="/<%= user.image %>"
                width="100"
                class="img-thumbnail mt-1"
              />
            </div>

            <input type="hidden" name="old_image" value="<%= user.image %>" />

            <!-- SUBMIT BUTTON -->
            <div class="mb-3 d-grid">
              <input
                type="submit"
                name="submit"
                value="Update User"
                class="btn btn-success btn-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<%- include('layout/footer.ejs') %>
```

- #### routes.js

```js
// ADD USER PAGE
.
.
// EDIT A USER
router.get('/edit/:id', (req, res) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) {
      res.redirect('/');
    } else {
      if (!user) {
        res.redirect('/');
      } else {
        res.render('edit_users.ejs', {
          title: 'Edit User',
          user: user,
        });
      }
    }
  });
});
```
