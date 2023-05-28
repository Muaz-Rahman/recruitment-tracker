const express = require('express')
const initializeModels = require('../models/initializeModels')

const app = express()

const postForCandidateDetails = app.post('/candidatedetails', async (req, res) => {
    const [CandidateModel, InterviewModel] = await initializeModels()
    try {
        const candidate = await CandidateModel.findByPk(req.body.id, {
            attributes: ['id', 'name', 'role', 'cv_url'],
            include: [{
                model: InterviewModel,
                attributes: ['interview_stage', 'interview_result', 'interviewer', 'interview_feedback', 'interview_date_time'],
                order: [['interview_stage', 'ASC']],
            }]
        })
        res.send(candidate)
    } catch (error) {
        console.log(error)
        res.send({ message: "There was an error" })
    }
})

module.exports = postForCandidateDetails