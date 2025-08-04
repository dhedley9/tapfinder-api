const bcrypt = require('bcrypt');
const PEPPER = process.env.PEPPER;

class AuthUtils {

    static async createSalt( saltRounds = 10 ) {

        return await bcrypt.genSalt( saltRounds );
    }

    static async hashPassword( password, salt ) {
        
        password = password + PEPPER;

        return await bcrypt.hash( password, salt );
    }
}

module.exports = AuthUtils;