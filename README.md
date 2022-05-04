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
