const express       = require( 'express' );
const dotenv        = require( 'dotenv' );
const { Sequelize } = require( 'sequelize' );

// Load .env into process.env
dotenv.config();

// Configure the Sequelize ORM to connect to Postgres database
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

const User = require('./src/Models/User.js')(sequelize);

// Configure the express app
const app     = express();
const PORT    = process.env.PORT || 4001;;

const startServer = async () => {

    try {
        // Authenticate with the database first
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync the tables
        await User.sync();
        console.log('Database synced.');

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();