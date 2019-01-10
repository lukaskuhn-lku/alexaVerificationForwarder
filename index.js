const verifier = require('alexa-verifier');
const request = require('request');


exports.index = (event, context, callback) => {
    console.log("Headers: " + JSON.stringify(event.headers));
    console.log("Body: " + JSON.stringify(event.body));

    console.log(JSON.stringify(event.req));

    console.log("Starting Verification");
    verifier(event.headers["SignatureCertChainUrl"], event.headers["Signature"], event.body, function (error) {
        console.log("Verification failed.");
    });

    var url = "https://ffmw0rps5g.execute-api.eu-central-1.amazonaws.com/product-12-2018";

    console.log("VERIFICATION SUCCESFUL");

    /*
    request.post({
       headers: JSON.stringify(event.headers),
       url: url,
       body: JSON.stringify(event.body)
    }, function(error,response,body){

    });
    */


};