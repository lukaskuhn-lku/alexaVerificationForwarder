const verifier = require('alexa-verifier');
const request = require('request');

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

process.env.NODE_ENV = 'production';
const config = require('./config')

const index = function(event, context, callback) {
    console.log("[Index Handler] Request received");

    var signatureCertChainURL = event.headers["SignatureCertChainUrl"];
    var signature = event.headers["Signature"];
    var body = JSON.stringify(event.body);

    console.log("SignatureCertChainUrl: " + signatureCertChainURL);
    console.log("Signature: " + signature);
    console.log("Body: " + body);

    console.log("Starting Verification process");

    verifier(signatureCertChainURL, signature, body, function (error) {
        if (error) {
            console.log("Alexa Skill Verification Request failed.");
            console.log(error.toString());

            return context.fail("Bad Request: Failed Authentication");
        } else {
            var date = Date.now().toString();
            var bodyString = body.toString();

            let url = global.gConfig.gatewayURL.toString(); 

            console.log("Alexa Skill Verification Request successful");

            request.post({
                headers: JSON.stringify(event.headers),
                url: url,
                body: JSON.stringify(event.body)
            }, function (error, response, body) {
                if (error) {
                    console.log(error);
                    throw error;
                }

                console.log("Promise: " + response.body);
                console.log("Body: " + body);
                callback(null, JSON.parse(response.body));
            });
        }
    });

};

exports.handler = index;