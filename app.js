const express = require( 'express' );
const dotenv  = require( 'dotenv' );

// Load .env into process.env
dotenv.config();

const app     = express();
const port    = process.env.PORT || 4001;


app.listen( port, () => {

    console.log(`Server is listening on: http://localhost:${port}`);
});