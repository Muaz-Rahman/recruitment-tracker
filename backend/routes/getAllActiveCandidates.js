const express = require('express')
const initializeModels = require('../models/initializeModels')

const app = express()

const getAllActiveCandidates = app.get('/activecandidates', async (req, res) => {
    const [CandidateModel, InterviewModel] = await initializeModels()
    const Candidates = await CandidateModel.findAll({
        attributes: ['id', 'name', 'role'],
        where: { is_active: true },
        include: [{
            model: InterviewModel,
            attributes: ['interview_stage', 'interview_result'],
            order: [['interview_stage', 'DESC']],
            limit: 1,
        }]
    })
    res.send(Candidates)
})

module.exports = getAllActiveCandidates