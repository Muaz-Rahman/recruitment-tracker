const dotenv = require('dotenv')
const ordinal = require('ordinal')

dotenv.config()
const webhookUrl = process.env.SLACK_WEBHOOK_URL

const slackWebhookRequestHandler = async (candidateName, role, cvUrl, result, interviewer, feedback, dateTime, stage) => {
    const bulletedFeedback = feedback.replace(/\n/g, "\n• ")
    const feedbackText = bulletedFeedback ? "Feedback:\n• " + bulletedFeedback : "Feedback:\n• No feedback was given"
    const slackMessageObject = {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Name: " + candidateName
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Applied For: " + role
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "CV: " + cvUrl
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": ordinal(stage) + " Round Interview: " + result
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Interviewer: " + interviewer
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": feedbackText
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Date: " + dateTime
                }
            }
        ]
    }
    await fetch(webhookUrl, { method: 'POST', body: JSON.stringify(slackMessageObject) })
}

module.exports = slackWebhookRequestHandler