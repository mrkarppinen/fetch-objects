'use strict';

const AWS = require('aws-sdk');
const Classifier = require('./src/classifier');

const key = process.env.key;
const secret = process.env.secret;


 const rekognition = new AWS.Rekognition({
    region: 'us-east-1',
    apiVersion: '2016-06-27',
    accessKeyId: key,
    secretAccessKey: secret
});

const classifier = new Classifier(rekognition);

exports.handler = (event, context, callback) => {
    
    if (event.body !== null && event.body !== undefined) {

        let body = JSON.parse(event.body)

        classifier.byDataURI(body.analyze).then( (data) => {
            callback(null, message(data));
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
                'Content-type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type,X-Api-Key',
                'Access-Control-Allow-Methods':  'POST',
                'Access-Control-Allow-Origin': '*'
            }    
    };
}