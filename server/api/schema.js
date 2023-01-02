const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLScalarType
} = require ('graphql');


const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require ('../models/database.js');

// hardcoding data for test purposes
let newUserId = 1;
const users = [
  {
    id: 'ona',
    email: 'ona@codesmith.com',
    organization: 'KnightOwl',
    password: 'hoothoot',
  },
  {
    id: 'jackson',
    email: 'jackson@codesmith.com',
    organization: 'KnightOwl',
    password: 'hoothoot',
  },
  {
    id: 'simon',
    email: 'simon@codesmith.com',
    organization: 'KnightOwl',
    password: 'hoothoot',
  },
  {
    id: 'caitlin',
    email: 'caitlin@codesmith.com',
    organization: 'KnightOwl',
    password: 'hoothoot',
  },
]

let newQueryID = 5;
const badQueries = [
  {
    id: '1',
    querierIPAddress: '0:0:0:1',
    queryString: 'Give me money',
    rejectedBy: 'depthLimiter',
    rejectedOn: 'Dec. 21 2022 9:35:00',
    userID: 'ona'
  },
  {
    id: '2',
    querierIPAddress: '0:0:2:1',
    queryString: 'Sneaky API schema reveal',
    rejectedBy: 'costLimiter',
    rejectedOn: 'Dec. 21 2022 9:35:22',
    userID: 'caitlin',
  },
  {
    id: '3',
    querierIPAddress: '0:9:0:1',
    queryString: 'hihihihihihihihi',
    rejectedBy: 'rateLimiter',
    rejectedOn: 'Dec. 21 2022 9:45:50',
    userID: 'jackson'
  },
  {
    id: '4',
    querierIPAddress: '0:0:0:1',
    queryString: 'oh no a malicious query D:',
    rejectedBy: 'depthLimiter',
    rejectedOn: 'Dec. 21 2022 9:35:00',
    userID: 'simon'
  },
]

const middlewareFunctions = [
  {
    id: 1,
    name: 'costLimiter',
  },
  {
    id: 2,
    name: 'rateLimiter',
  },
  {
    id: 3,
    name: 'depthLimiter',
  }
]

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

const MiddlewareType = new GraphQLObjectType({
  name: 'Middleware',
  description: 'A piece of middleware in the KnightOwl GraphQL protection library',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
})

// const OrganizationType = new GraphQLObjectType({
//   name: 'Organization',
//   description: 'An organization to which a KnightOwl user belongs',
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     users: { type: new GraphQLList(UserType)},
//     badQueries: { 
//       type: new GraphQLList(BadQueryType),
//       resolve: (organization) => {
//         return badQueries.filter(query => query.organizationID === organization.id);
//       }
//     },
//   })
// })

const BadQueryType = new GraphQLObjectType({
  name: 'BadQuery',
  description: 'A query that has been rejected by KnightOwl middleware',
  fields: () => ({
    id: { type: GraphQLID },
    querierIPAddress: { type: GraphQLString},
    queryString: { type: GraphQLString },
    rejectedBy: { 
      type: MiddlewareType,
      resolve: (badQuery, args) => {
        return middlewareFunctions.find(func => func.name === badQuery.rejectedBy);
      }
    },
    rejectedOn: { type: GraphQLString },
    // we should decide whether to tie query collections to user or organization
    organization: { type: GraphQLString },
    userID: { type: GraphQLID },
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    // !!!! user queries are for dev purposes only, do NOT keep this in prod!! !!!!
    user: {
      type: UserType,
      description: 'A single KnightOwl user',
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        console.log('resolving user query')
        return users.find(user => user.id === args.id)
      },
    },
    users: {
      type: new GraphQLList(UserType),
      description: 'A list of all KnightOwl users',
      resolve: () => users,
    },
    // signIn query should ultimately hash entered pass to check against hashed pass in db,
    // and assign login cookie to user
    signIn: {
      type: GraphQLID,
      description: 'Authenticates returning KnightOwl user and returns user ID',
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let userID; // later assigned with userID if found in DB and password is successfully compared by the bcrypt.compare method
        const values = [ args.email ];
        const VERIFY_USER = `SELECT password, id FROM users WHERE email = $1;`;
        // Returns a boolean if the user has been verified given the inputted credentials, password and email.
        const user = await db.query(VERIFY_USER, values)
          .then(async (hash) => {
            // Compare the hashed password via bcrypt with the stored password in the database given the user provided email.
            const result = await bcrypt.compare(args.password, hash.rows[0].password).then(result => result);
            console.log('user: ', hash.rows[0]);
            userID = hash.rows[0].id
            return result;
          })
          .catch((err) => console.log(err));
        return (user === false) ? 'Email or password incorrect.' : userID;
      }
    },
    userQueries: {
      type: new GraphQLList(BadQueryType),
      description: 'Retrieves a list of queries associated with the user that have been rejected by KnightOwl middleware',
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return badQueries.filter(query => query.userID === args.id);
      }
    },
    middlewareQueries: {
      type: new GraphQLList(BadQueryType),
      description: 'Retrieves a list of queries rejected by a given Knight Owl middleware function and associated with current user',
      args: {
        userID: { type: GraphQLID },
        middlewareFunc: { type: GraphQLString }
      },  
      resolve: (parent, args) => {
        return badQueries.filter(badQuery => badQuery.rejectedBy === args.middlewareFunc && badQuery.userID === args.userID)
      }
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    createUser: {
      type: GraphQLString,
      description: 'Registers new user',
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        organization: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
      
        // hash password before saving
        const { password } = args;
        const result = await bcrypt.hash(password, saltRounds).then(function(hash) {
         // Insert SQL query to create a new user in the database
         const newUser = [args.email, hash, args.organization];
         const ADD_USER = `INSERT INTO users (email, password, organization) VALUES ($1, $2, $3) RETURNING id;`;
         // Add the newUser to the database and if there is already a user with the following email then return the error string
         const newUserId = db.query(ADD_USER, newUser)
          .then(newUser => {
            console.log('newUser: ', newUser.rows)
            return newUser;
          })
          .catch(err => {
            console.log(err);
            // Error code corresponding to a duplicate user.
            if (err.code === '23505') return 'Duplicate user found error';
          });
          return newUserId;
       })
       // Return either the error string of the duplicate user or the user id of the new user
       return result;
      }
    },
    saveQuery: {
      type: BadQueryType,
      description: 'Stores a rejected query in database so user can see metrics on query rejections from client',
      args: {
        userID: { type: GraphQLID },
        querierIPAddress: { type: GraphQLString },
        queryString: { type: GraphQLString },
        rejectedBy: { type: GraphQLString },
        rejectedOn: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const newQuery = {
          id: `${newQueryID++}`,
          userID: args.userID,
          querierIPAddress: args.querierIPAddress,
          queryString: args.queryString,
          rejectedBy: args.rejectedBy,
          rejectedOn: args.rejectedOn,
        };
        badQueries.push(newQuery);
        return newQuery;
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
})



module.exports = { schema }