const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URL)

const Candidate = sequelize.define('Candidate', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cv_url:{
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
})

module.exports = Candidate