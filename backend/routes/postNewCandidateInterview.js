const express = require('express')
const slackWebhookRequestHandler = require('../lib/slackWebhookRequestHandler')
require('../lib/slackWebhookRequestHandler')
const initializeModels = require('../models/initializeModels')

const app = express()

const postNewCandidateInterview = app.post('/newcandidate', async (req, res) => {
    try {
        const [CandidateModel, InterviewModel] = await initializeModels()
        const newCandidate = await CandidateModel.create({
            name: req.body.name,
            role: req.body.role,
            cv_url: req.body.cv,
            is_active: req.body.result !== "Failed"
        })
            .then(async (candidate) => {
                const newInterview = await InterviewModel.create({
                    candidate_id: candidate.id,
                    interview_stage: 1,
                    interview_result: req.body.result,
                    interviewer: req.body.interviewer,
                    interview_feedback: req.body.feedback,
                    interview_date_time: req.body.date_time
                })
            })

        await slackWebhookRequestHandler(req.body.name, req.body.role, req.body.cv, req.body.result, req.body.interviewer, req.body.feedback, req.body.date_time, 1)
        res.json({ status: 200, message: "Ok" })
    } catch (error) {
        console.log(error)
        res.json({ message: "There was an error" })
    }
})

module.exports = postNewCandidateInterview
