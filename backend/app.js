const express = require('express')
const cors = require('cors')
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser')
const postNewCandidateInterview = require('./routes/postNewCandidateInterview')
const getAllActiveCandidates = require('./routes/getAllActiveCandidates')
const postForCandidateDetails = require('./routes/postForCandidateDetails')
const postForNewInterview = require('./routes/postForNewInterview')
const postNewInterviewStage = require('./routes/postNewInterviewStage')
const putExistingInterviewStatus = require('./routes/putExistingInterviewStatus')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(postNewCandidateInterview, getAllActiveCandidates, postForCandidateDetails, postForNewInterview, postNewInterviewStage, putExistingInterviewStatus)
const sequelize = new Sequelize(process.env.POSTGRES_URL)

const port = process.env.PORT || 6005

app.listen(port, "localhost", async () => {
    try {
        console.log("Server has started on port: " + port)
        await sequelize.authenticate()
        console.log('Connection to Postgres server established successfully.')
    } catch (error) {
        console.log(error)
    }
}
)