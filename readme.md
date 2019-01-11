# Lambda: Alexa Verification Forwarder
This Lambda function is designed to get requests from the Alexa Skill, check their verification (Signature URL and Certificate) and then forward the request if the verification is valid or send a HTTP 400 Bad Request if it is not.

The function is needed because it is a requirement in the Alexa Skill Verification Process to Check if the Requests are valid Alexa requests.

### Using
- alexa-verifier (https://github.com/mreinstein/alexa-verifier)
- request (https://github.com/request/request)

### Setup in AWS
The Lambda Function does not need any special setup.

The API Gateway requires:

- A Post Ressource to the Lambda Expression

- A Mapping Template for application/json in the following format: 
(https://docs.aws.amazon.com/de_de/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html)

        {
          "method": "$context.httpMethod",
          "body" : $input.json('$'),
          "headers": {
              #foreach($param in $input.params().header.keySet())
              "$param": "$util.escapeJavaScript($input.params().header.get($param))"
              #if($foreach.hasNext),#end
              #end
          }
        }
        
- A HTTP 400 Status Response
- A mapped Lambda Regex Expression in the follwing format
              
      Bad Request: .*
      
  Mapped to the HTTP 400 Status Response with Pass-Through Configuration
