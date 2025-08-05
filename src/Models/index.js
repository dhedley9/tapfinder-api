const { Sequelize } = require( 'sequelize' );

// Configure the Sequelize ORM to connect to Postgres database
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

const User = require('./User')( sequelize );

module.exports = {
    sequelize,
    Sequelize,
    User
};