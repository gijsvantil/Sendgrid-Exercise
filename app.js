var express = require('express');
var app = express();

// requiring Sendgrid and loading API key from environment
sendgrid_api= process.env.SENDGRID_APIKEY
console.log(sendgrid_api)

// ENTER THE MAILADDRESS YOU WANT TO SENT AN EMAIL TO.
var to = ""
// ENTER YOUR MAILADDRESS
var sender = ""

var helper = require('sendgrid').mail
from_email = new helper.Email(sender)
to_email = new helper.Email(to)
subject = "Hello World from the SendGrid Node.js Library"
content = new helper.Content("text/plain", "some text here")
mail = new helper.Mail(from_email, subject, to_email, content)

var sg = require('sendgrid').SendGrid(sendgrid_api)
var requestBody = mail.toJSON()
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