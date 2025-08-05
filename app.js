const express = require( 'express' );
const dotenv  = require( 'dotenv' );

const expressParseErrorHandler = require( 'express-body-parser-error-handler' )

// Load .env into process.env
dotenv.config();

// Load the database
const db = require( './src/models/index.js' );

// Configure the express app
const app  = express();
const PORT = process.env.PORT || 4001;

// Middleware - Configure express to handle JSON payloads
app.use( express.json() );

// Middleware - Handle parse errors (e.g. invalid JSON)
app.use( expressParseErrorHandler() );

// Import v1 routes
const routes = require( './src/routes/v1' );
app.use( '/v1', routes );

const startServer = async () => {

    try {
        // Authenticate with the database first
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync the tables
        await db.User.sync();
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