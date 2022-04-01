const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..', `.${process.env.NODE_ENV}.env`)})

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PW,
    "database": process.env.POSTGRES_DB,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
