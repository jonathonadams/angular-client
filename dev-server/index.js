// 'use strict';
const path = require('path');
const express = require('express');
const graphqlServer = require('json-graphql-server');
const jsonServer = require('json-server');
const data = require('./db.json');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const auth = require('./auth');
const register = require('./register');
const createId = require('./create-id');

const middlewares = jsonServer.defaults();

const app = express();
const PORT = 3000;

app.use(middlewares);
app.use(jsonServer.bodyParser);

app.post('/authorize', auth);
app.post('/register', register);

// A small middleware function to create an id property on post request
app.use(createId);

app.use('/api', router);
app.use('/graphql', graphqlServer.default(data));

app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log('visit /api/* for a REST API');
  console.log('visit /grapqhl for a GraphQL API');
});
