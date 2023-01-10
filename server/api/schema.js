require('dotenv').config();

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLInputObjectType
} = require ('graphql');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require ('../models/database.js');

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A KnightOwl user',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString)},
    organization: { type: new GraphQLNonNull(GraphQLString)},
    password: { type: new GraphQLNonNull(GraphQLString)},
  })
});

const VerifiedUserType = new GraphQLObjectType({
  name: 'VerifiedUser',
  description: 'The response sent back to client for a successful sign in request',
  fields: () => ({
    id: { type: GraphQLID},
    token: { type: GraphQLID }
  })
})

const MiddlewareType = new GraphQLObjectType({
  name: 'Middleware',
  description: 'A piece of middleware in the KnightOwl GraphQL protection library',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
})

const BadQueryType = new GraphQLObjectType({
  name: 'BadQuery',
  description: 'A query that has been rejected by KnightOwl middleware',
  fields: () => ({
    query_id: { type: GraphQLID },
    querier_ip_address: { type: GraphQLString},
    query_string: { type: GraphQLString },
    rejected_by: { type: GraphQLString },
    rejected_on: { type: GraphQLString },
    user_id: { type: GraphQLID },
  })
})

const BatchQueryInputType = new GraphQLInputObjectType({
  name: 'BatchQueryInput',
  fields: () => ({
    querier_IP_address: { type: GraphQLString},
    query_string: { type: GraphQLString },
    rejected_by: { type: GraphQLString },
    rejected_on: { type: GraphQLString },
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    // signIn query should ultimately assign login cookie to user
    signIn: {
      type: GraphQLID,
      description: 'Authenticates returning KnightOwl user and returns user ID',
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        const {res} = context;
        let userID; // later assigned with userID if found in DB and password is successfully compared by the bcrypt.compare method
        const values = [ args.email ];
        const VERIFY_USER = `SELECT password, id FROM users WHERE email = $1;`;
        // Returns a boolean if the user has been verified given the inputted credentials, password and email.
        const user = await db.query(VERIFY_USER, values)
          .then(async (hash) => {
            // Compare the hashed password via bcrypt with the stored password in the database given the user provided email.
            const result = await bcrypt.compare(args.password, hash.rows[0].password).then(result => result);
            userID = hash.rows[0].id;
            res.cookie('Auth', jwt.sign(
              {userID: userID,
              email: args.email,
              signedIn: true},
              process.env.TOKEN_KEY,
              {
                expiresIn: '2h',
              }
            ));

            return result;
          })
          .catch((err) => console.log(err));
        return (user === true) ? 'Success' : 'Email or password incorrect.';
      }
    },
    userQueries: {
      type: new GraphQLList(BadQueryType),
      description: 'Retrieves a list of queries associated with the user that have been rejected by KnightOwl middleware',
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context) => {
        if (context.res.locals.signedIn) {
          const values = [ context.res.locals.signedIn.userID ];
          // Get all the queries associated with the id of the logged in user.
          const GET_QUERIES = `SELECT * FROM bad_queries WHERE user_id = $1 ORDER BY rejected_on DESC;`
          const queries = await db.query(GET_QUERIES, values)
            .then((data) => data.rows)
            .catch((err) => console.log(err))
          return queries;
        } else {
          return [{rejected_by: "User not logged in"}]
        }
      }
    },
    // Probably won't need separate query for specific middleware
    // middlewareQueries: {
    //   type: new GraphQLList(BadQueryType),
    //   description: 'Retrieves a list of queries rejected by a given Knight Owl middleware function and associated with current user',
    //   args: {
    //     userID: { type: GraphQLID },
    //     middlewareFunc: { type: GraphQLString }
    //   },  
    //   resolve: (parent, args) => {
    //     return badQueries.filter(badQuery => badQuery.rejectedBy === args.middlewareFunc && badQuery.userID === args.userID)
    //   }
    // }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    createUser: {
      type: GraphQLID,
      description: 'Registers new user',
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        organization: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        const { res } = context;
        // hash password before saving
        const { password } = args;
        const result = await bcrypt.hash(password, saltRounds).then(function(hash) {
         // Insert SQL query to create a new user in the database
         const newUser = [args.email, hash, args.organization];
         const ADD_USER = `INSERT INTO users (email, password, organization) VALUES ($1, $2, $3) RETURNING id;`;
         // Add the newUser to the database and if there is already a user with the following email then return the error string
         const newUserId = db.query(ADD_USER, newUser)
          .then(newUser => {
            res.cookie('Auth', jwt.sign(
              {userID: newUser.rows[0],
              email: args.email,
              signedIn: true},
              process.env.TOKEN_KEY,
              {
                expiresIn: '2h',
              }
            ));

            return 'Success';
          })
          .catch(err => {
            console.log(err);
            // Error code corresponding to a duplicate user.
            if (err.code === '23505') return 'Duplicate user found error';
          });
          return result;
       })
       // Return either the error string of the duplicate user or the user id of the new user
       return result;
      }
    },
    saveQuery: {
      type: BadQueryType,
      description: 'Stores a rejected query in database so user can see metrics on query rejections from client',
      args: {
        user_id: { type: GraphQLID },
        querier_ip_address: { type: GraphQLString },
        query_string: { type: GraphQLString },
        rejected_by: { type: GraphQLString },
        rejected_on: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        // Insert SQL query to create a new query in the database
         const newQuery = [args.user_id, args.querier_ip_address, args.query_string, args.rejected_by, args.rejected_on];
         const ADD_QUERY = `INSERT INTO bad_queries (user_id, querier_ip_address, query_string, rejected_by, rejected_on) VALUES ($1, $2, $3, $4, $5) RETURNING query_id;`;
      
         const newQueryId = await db.query(ADD_QUERY, newQuery)
          .then(data => {
            return data.rows[0];
          })
          .catch(err => console.log(err));
        return newQueryId;
      }
    },
    saveQueryBatch: {
      type: GraphQLString,
      description: 'Stores a batch of queries forwarded from KO middleware',
      args: {
        cachedQueries: { type: new GraphQLList(BatchQueryInputType) },
        KOUser: { type: GraphQLString },
        KOPass: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        // cache = await args.cachedQueries.json();
        // confirm credentials
        const { cachedQueries, KOUser, KOPass } = args;
        const VERIFY_USER = `SELECT password, id FROM users WHERE email = $1;`;
        const values = [KOUser];
        let user_id;
        const saved = await db.query(VERIFY_USER, values)
          .then(async (hash) => {
            // Compare the hashed password via bcrypt with the stored password in the database given the user provided email.
            const result = await bcrypt.compare(KOPass, hash.rows[0].password).then(result => result);
            user_id = hash.rows[0].id
            return result;
          })
          .then(async (validated) => {
            savedQueries = []
            let add_queries = `INSERT INTO bad_queries (user_id, querier_ip_address, query_string, rejected_by, rejected_on) VALUES `
            const values = [];
            const inputs = []
            let inputCount = 1
            for (let i = 0; i < cachedQueries.length; i++) {
              values.push(user_id, cachedQueries[i].querier_IP_address, cachedQueries[i].query_string, cachedQueries[i].rejected_by, cachedQueries[i].rejected_on);
              inputs.push(`($${inputCount++}, $${inputCount++}, $${inputCount++}, $${inputCount++}, $${inputCount++})`);
              if (i < cachedQueries.length - 1) {
                inputs.push(', ')
              }
            }
            inputs.forEach(inputChunk => add_queries += inputChunk);
            await db.query(add_queries, values)
            .then(data => 'Queries saved')
          })
          .catch((err) => console.log(err));
        return saved;
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
})

module.exports = { schema }