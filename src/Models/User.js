const { Model, DataTypes } = require('sequelize');

const fields = {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'standard'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
    }
}

const options = {
    modelName: 'User', // We need to choose the model name
    tableName: 'Users' // Explicitly tell sequlize the table name
}

class User extends Model{}

module.exports = ( sequelize ) => {

    options.sequelize = sequelize;

    User.init( fields, options );

    return User;
};