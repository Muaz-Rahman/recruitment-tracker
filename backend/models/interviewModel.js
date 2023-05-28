const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URL)

const Interview = sequelize.define('Interview', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    candidate_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Candidates',
            key: 'id'
        },
        allowNull: false
    },
    interview_stage:{
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    interview_result:{
        type: DataTypes.STRING,
    },
    interviewer:{
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    interview_feedback:{
        type: DataTypes.TEXT,
    },
    interview_date_time:{
        type: DataTypes.STRING,
    }
})

module.exports = Interview