const express   = require( 'express' );
const router    = express.Router();
const { User }  = require( '../../models/index.js' );
const AuthUtils = require( '../../utils/authUtils.js' );

const { body, validationResult, matchedData } = require( 'express-validator' );

// Re-usable validation / sanitisation chains
const checkEmail = () => body( 'email' ).trim().isEmail();

// Route callbacks

const handleLogin = async ( req, res ) => {

    // Get results from Express Validator
    const result = validationResult( req );

    // Output the Express Validator results as 
    if( !result.isEmpty() ) {
        
        res.status( 400 );
        res.json( { errors: result.array() } );

        return res;
    }

    const data     = matchedData( req )
    const email    = data.email;
    const password = data.password;

    const user = await User.findOne({
        where: {
            email: email,
        },
    });

    // TODO: Reformat error responses to be consistent with Express Validator
    if( !user ) {

        res.status( 401 );
        res.json( { message: 'Invalid username or password' } );

        return res;
    }

    const check = await AuthUtils.checkPassword( password, user.passwordHash, user.salt );

    if( !check ) {

        res.status( 401 );
        res.json( { message: 'Invalid username or password' } );

        return res;
    }

    res.status(200)
    res.json({ message: 'Authentication successful', token: 'dummy-jwt-token' });

    return res;
}

// Register routes

// POST /v1/auth/login
router.post( 
    '/login', 
    checkEmail(),
    body( 'password' ).notEmpty(),
    handleLogin
);

module.exports = router;