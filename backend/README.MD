# Recruitment Tracker Backend

## Description

This ExpressJS application serves as the backend and manages the interaction with a **postgres** database for the incoming requests for its frontend counterpart.

As per the `.env` file configuration, the backend server will be using the port 6001, unless configured otherwise.

**For setting up the postgres connection:** If you are using postgres in your localhost, then go to the `.env` file and change the `POSTGRES_URL` variables' value to your desired database in your running postgres server in the format given below:

> `postgresql://username:password@localhost:postgres_server_port/database_name`

**To use your own Slack channel incoming webhook:** Once you have your webhook generated, simply go to the `.env` file and replace the value of the `SLACK_WEBHOOK_URL` with your webhook url.

**To run the server:** In the folder directory, open console and type:

> `node app.js`
