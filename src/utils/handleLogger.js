const { IncomingWebhook } = require('@slack/webhook')

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

const slackWebhook = new IncomingWebhook(SLACK_WEBHOOK_URL)

const loggerStream = {
  write: message => slackWebhook.send({ text: message })
}

module.exports = { loggerStream }
