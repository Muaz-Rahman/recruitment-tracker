const express = require('express')
const initializeModels = require('../models/initializeModels')
const slackWebhookRequestHandler = require('../lib/slackWebhookRequestHandler')

const app = express()

const postNewInterviewStage = app.post('/addinterview', async (req, res) => {
    const [CandidateModel, InterviewModel] = await initializeModels()
    try {
        if (req.body.result === "Failed") {
            await CandidateModel.update({ is_active: false }, { where: { id: req.body.id } })
        }
        const existingInterview = await InterviewModel.findOne({ where: { candidate_id: req.body.id, interview_stage: req.body.stage } })
        if (existingInterview) {
            res.json({ status: 422, message: "Interview already exists" })
            return
        }
        const newInterview = await InterviewModel.create({
            candidate_id: req.body.id,
            interview_stage: req.body.stage,
            interview_result: req.body.result,
            interviewer: req.body.interviewer,
            interview_feedback: req.body.feedback,
            interview_date_time: req.body.date_time
        })
        await slackWebhookRequestHandler(req.body.name, req.body.role, req.body.cv, req.body.result, req.body.interviewer, req.body.feedback, req.body.date_time, req.body.stage)
        res.json({ status: 200, message: "Ok" })
    } catch (error) {
        console.log(error)
        res.json({ message: "There was an error" })
    }
})

module.exports = postNewInterviewStage