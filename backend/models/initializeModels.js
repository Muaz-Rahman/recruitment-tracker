const CandidateModel = require('../models/candidateModel')
const InterviewModel = require('../models/interviewModel')

const InitializeModels = async (CandidateModelParam, InterviewModelParam) => {
    CandidateModelParam = await CandidateModel.sync()
    InterviewModelParam = await InterviewModel.sync()
    CandidateModelParam.hasMany(InterviewModelParam, { foreignKey: 'candidate_id' })
    InterviewModelParam.belongsTo(CandidateModelParam, { foreignKey: 'candidate_id' })
    return [CandidateModelParam, InterviewModelParam]
}

module.exports = InitializeModels