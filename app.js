const express = require('express');
const app = express();

// requiring Sendgrid and loading API key from environment
const sendgrid_api= process.env.SENDGRID_APIKEY

// ENTER THE MAILADDRESS YOU WANT TO SENT AN EMAIL TO.
let to = ""
// ENTER YOUR MAILADDRESS
let sender = ""

// HELPER variable
const helper = require('sendgrid').mail
from_email = new helper.Email(sender)
to_email = new helper.Email(to)
subject = "Hello World from the SendGrid Node.js Library"
content = new helper.Content("text/plain", "some text here")
mail = new helper.Mail(from_email, subject, to_email, content)

// requiring sendgrid and loading in API key
const sg = require('sendgrid').SendGrid(sendgrid_api)
// JSONing my template email
var requestBody = mail.toJSON()
// APIcall
var request = sg.emptyRequest()
request.method = 'POST'
request.path = '/v3/mail/send'
request.body = requestBody
sg.API(request, function (response) {
	console.log(response.statusCode)
	console.log(response.body)
	console.log(response.headers)
})

app.listen(3000)