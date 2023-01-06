const express = require('express');
const path = require('path');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const cookieParser = require('cookie-parser')
const { knightOwl } = require('knightowl')
const util = require('util');
const { schema } = require('./api/schema.js')
// ATTN - testController commented out until db is spun up and can be connected to
// const testController = require('./controllers/testController.js');


// Automatically parse urlencoded body content and form data from incoming requests and place it in req.body
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/build', express.static(path.join(__dirname, '../build')));

// Root
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// GraphQL endpoint
app.use('/graphql', knightOwl.costLimiter, knightOwl.rateLimiter, graphqlHTTP({
  schema,
  graphiql: true,
  validationRules: [knightOwl.depthLimit(0)]
}));

app.use('/middleware', (req, res, next) => {
  console.log('middleware request: ', util.inspect(req.body, {showHidden: true, depth: null, colors: true}));
  return next();
}, (req, res) => {
  return res.status(200).json('all good')
})

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
app.listen(3000);

module.exports = app;