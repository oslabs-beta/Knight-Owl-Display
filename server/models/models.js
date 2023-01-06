// current SQL schema:

// CREATE TABLE bad_queries(
//   query_id SERIAL PRIMARY KEY,
//   querier_IP_address VARCHAR(45),
//   query_string VARCHAR(5000),
//   rejected_on TIMESTAMP,
//   rejected_by VARCHAR(22),
//   user_id INTEGER REFERENCES USERS (id)
//  )

// example query to create new bad_query datapoint: 
// INSERT INTO bad_queries (querier_IP_Address, query_string, rejected_by, rejected_on, user_id)
// VALUES ('0:0:0:1', 'Give me money', 'depth_limiter', '2022-12-21 09:35:00', 2)

// CREATE TABLE users (
//   id  SERIAL PRIMARY KEY,
//   email  VARCHAR(320),
//   password  VARCHAR(60),
//   organization VARCHAR(60)
// )

// example query to create new user datapoint:
// INSERT INTO users (email, password, organization)
// VALUES ('ona@codesmith.com', '$2b$10$kyjppXLINEfIftwJY8dxuO4eoLFZArsbF79uhAf38Mm4Wm7cj.yH2', 'KnightOwl')




// const { DataTypes, Sequelize } = require('sequelize');
// const { PG_URI } = process.env;
// const pg = require('pg');

// // Creating an instance of sequelize to connect to database
// const sequelize = new Sequelize('localdev', 'localdev', 'localdev', {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: 5433
// });

// // User Table Model
// const Users = sequelize.define('Users', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false
//   },
//   username: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   }
// });

// // Queries Table Model
// const Middlewares = sequelize.define('Middlewares', {
//   ipAddress: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   middlewareFunc: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   message: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   }
// });

// // Associations
// Users.hasMany(Middlewares, {
//   foreignKey: 'user_id'
// });

// Middlewares.belongsTo(Users);



// // Checks if connection to DB is successful
// async function auth() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// //sequelize.sync is an asynchronus method that automatically syncs all the models
// async function dbSync() {
//   await sequelize.sync();
// };
// dbSync();

// module.exports = { Users, Middlewares };
