const express = require( 'express' );
const router  = express.Router();

// Import route modules
const authRoutes = require( './auth' );

// Mount sub-routes
router.use( '/auth', authRoutes ); // => /v1/auth

module.exports = router;