'use strict';

const AWS = require('aws-sdk');

const key = process.env.key;
const secret = process.env.secret;


exports.handler = (event, context, callback) => {
    
    if (event.body !== null && event.body !== undefined) {

        let body = JSON.parse(event.body)

        let params = {
            Image: {
                Bytes: Buffer.from(body.analyze,'base64')
            },
            MaxLabels: 20,
            MinConfidence: 25
        };

        let rekognition = new AWS.Rekognition({
            region: 'us-east-1',
            apiVersion: '2016-06-27',
            accessKeyId: key,
            secretAccessKey: secret
        });

        rekognition.detectLabels(params, function(err, data) {
            if (err) callback(null, message(err)) 
            else     callback(null, message(data));
        });

    }else {

        callback(null, message({msg: 'what!?'}));

    }



};


function message(body){
    return {
            statusCode: '200',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json'
            }    
    };
}