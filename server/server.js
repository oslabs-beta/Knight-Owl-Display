const express = require('express');
const path = require('path');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const PORT = process.env.PORT || 3000;

const cookieParser = require('cookie-parser')
const util = require('util');
const { schema } = require('./api/schema.js')
const authenticate = require('./controllers/authenticate.js');

// Automatically parse urlencoded body content and form data from incoming requests and place it in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/build', express.static(path.join(__dirname, '../build')));

// GraphQL endpoint
app.use('/graphql', authenticate, graphqlHTTP({
  schema
}));

// Root
app.get('*', authenticate, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).send('404 Error: Page Not Found');
});

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Listen on Port 3000
app.listen(PORT);

module.exports = app;