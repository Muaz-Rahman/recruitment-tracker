const express = require('express')
const initializeModels = require('../models/initializeModels')
const slackWebhookRequestHandler = require('../lib/slackWebhookRequestHandler')

const app = express()

const putExistingInterviewStatus = app.put('/updateinterview', async (req, res) => {
    const [CandidateModel, InterviewModel] = await initializeModels()
    try {
        if (req.body.result === "Failed") {
            await CandidateModel.update({ is_active: false }, { where: { id: req.body.id } })
        }
        const updatedInterview = await InterviewModel.update({
            interview_result: req.body.result,
            interview_feedback: req.body.feedback,
            interview_date_time: req.body.date_time
        }, { where: { candidate_id: parseInt(req.body.id), interview_stage: req.body.stage } })

        await slackWebhookRequestHandler(req.body.name, req.body.role, req.body.cv, req.body.result, req.body.interviewer, req.body.feedback, req.body.date_time, req.body.stage)

        res.json({ status: 200, message: "Ok" })
    } catch (error) {
        console.log(error)
        res.json({ message: "There was an error" })
    }
})

module.exports = putExistingInterviewStatus