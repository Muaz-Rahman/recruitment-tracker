const dotenv = require('dotenv')
dotenv.config()

const webhookUrl = process.env.SLACK_WEBHOOK_URL

const slackWebhookRequestHandler = async (candidateName, role, cvUrl, result, interviewer, feedback, dateTime) => {
    const bulletedFeedback = feedback.replace(/\n/g, "\n• ")
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
                    "text": "Applied for: " + role
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
                    "text": "Round 1 interview: " + result
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
                    "text": "Feedback:\n• " + bulletedFeedback
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
    await fetch(webhookUrl, {method: 'POST', body: JSON.stringify(slackMessageObject)})
}

module.exports = slackWebhookRequestHandler