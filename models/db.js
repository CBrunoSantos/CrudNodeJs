const Sequelize = require('sequelize')


    // conexão com o banco de dados MySql
    const sequelize = new Sequelize('postapp', 'root', '12345', {
        host: "localhost",
        dialect: 'mysql'
    })

    module.exports = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }