const { DataTypes, Sequelize } = require('sequelize');
const { PG_URI } = process.env;
const pg = require('pg');

// Creating an instance of sequelize to connect to database
const sequelize = new Sequelize('localdev', 'localdev', 'localdev', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

// User Table Model
const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Queries Table Model
const Middlewares = sequelize.define('Middlewares', {
  ipAddress: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  middlewareFunc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Associations
Users.hasMany(Middlewares, {
  foreignKey: 'user_id'
});

Middlewares.belongsTo(Users);



// Checks if connection to DB is successful
async function auth() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

//sequelize.sync is an asynchronus method that automatically syncs all the models
async function dbSync() {
  await sequelize.sync();
};
dbSync();

module.exports = { Users, Middlewares };
