const express   = require( 'express' );
const router    = express.Router();
const { User }  = require( '../../models/index.js' );
const AuthUtils = require( '../../utils/authUtils.js' );

// POST /v1/auth/login
router.post( '/login', async ( req, res ) => {

    if( typeof req.body !== 'object' ) {

        res.status( 400 );
        res.json( { message: 'This route expects a valid JSON object' } );

        return res;
    }

    const email    = req.body.email;
    const password = req.body.password;

    if( typeof email !== 'string' || typeof password !== 'string' || !email.length || !password.length ) {
        
        res.status( 400 );
        res.json( { message: 'Required parameters missing or empty' } );

        return res;
    }

    const user = await User.findOne({
        where: {
            email: email,
        },
    });

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

    res.status( 200 )
    res.json( { message: 'Authentication successful', token: 'dummy-jwt-token' } );

    return res;
});

module.exports = router;