const sequelize = require('sequelize')
const path = require('path')

const db = new sequelize({
    dialect:'sqlite',
    storage: path.join(__dirname,'user.db')
})

const Users = db.define('user',{
    username:{
        type:sequelize.STRING(50),
        unique:true,
        allowNull:false
    },
    password:{
        type:sequelize.STRING(50),
        allowNull:false
    }
})

module.exports = {
    db, Users
}