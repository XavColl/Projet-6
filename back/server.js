const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

require('./db');
app.use('/images', express.static(path.join(__dirname, 'images')));
const userRoutes = require('./routes/users.routes');
const sauceRoutes = require('./routes/sauces.routes');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
