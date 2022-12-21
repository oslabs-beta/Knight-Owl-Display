const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} = require ('graphql');

const util = require('util')

let newUserId = 1;
// hardcoding data for test purposes
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

const badQueries = [

]

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A KnightOwl user',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString)},
    organization: { type: OrganizationType},
    password: { type: new GraphQLNonNull(GraphQLString)},
  })
});

const MiddlewareType = new GraphQLObjectType({
  name: 'Middleware',
  description: 'A piece of middleware in the KnightOwl GraphQL protection library',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    caughtQueries: { type: new GraphQLList(BadQueryType)},
  })
})

const OrganizationType = new GraphQLObjectType({
  name: 'Organization',
  description: 'An organization to which a KnightOwl user belongs',
  fields: () => ({
    id: { type: GraphQLID },
    users: { type: new GraphQLList(UserType)},
    badQueries: { 
      type: new GraphQLList(BadQueryType),
      resolve: (organization) => {
        return badQueries.filter(query => query.organizationID === organization.id);
      }
    },
  })
})

const BadQueryType = new GraphQLObjectType({
  name: 'BadQuery',
  description: 'A query that has been rejected by KnightOwl middleware',
  fields: () => ({
    id: { type: GraphQLID },
    querierIPAddress: { type: GraphQLString},
    queryString: { type: GraphQLString },
    rejectedBy: { type: MiddlewareType},
    rejectedOn: { type: GraphQLString },
    // we should decide whether to tie query collections to user or organization
    organizationID: { type: GraphQLID },
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
      resolve: (parent, args) => {
        for (const user of users) {
          // NOTE: how to stop someone from logging in as multiple users simultaneously, since multiple
          // instances of the same query type can be sent in a single operation?
          if (user.email === args.email && user.password === args.password) {
            return user.id;
          }
        }
        return 'Email or password incorrect.'
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
      resolve: (parent, args) => {
        // check to make sure no other users registered to same email
        for (const user of users) {
          if (user.email === args.email) {
            return "User with this email already exists."
          }
        }
        // create new user object in users array with id
        const newUser = {
          id: `user${newUserId++}`,
          email: args.email,
          password: args.password,
          organization: args.organization
        };
        users.push(newUser);
        // return id
        return newUser.id;
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
})



module.exports = { schema }