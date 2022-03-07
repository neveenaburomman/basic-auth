'use strict'


const Users = (sequelize,DataTypes)=>sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
        // unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Users;