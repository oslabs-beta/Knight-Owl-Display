const express = require('express');
const path = require('path');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { knightOwl } = require('knightowl')
const PORT = process.env.PORT || 3000;

const { schema } = require('./api/schema.js')
// ATTN - testController commented out until db is spun up and can be connected to
// const testController = require('./controllers/testController.js');


// Automatically parse urlencoded body content and form data from incoming requests and place it in req.body
app.use(express.json());
app.use(express.urlencoded());

if (process.env.NODE_ENV === "production") {
  app.use('/build', express.static(path.join(__dirname, '../build')));
}

// Root
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// GraphQL endpoint
app.use('/graphql', knightOwl.costLimiter, knightOwl.rateLimiter, graphqlHTTP({
  schema,
  graphiql: true,
  validationRules: [knightOwl.depthLimit(20)]
}));

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