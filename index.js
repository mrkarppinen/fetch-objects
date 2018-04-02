'use strict';

const AWS = require('aws-sdk');
const functions = require('./lib/functions');
const classifier = require('./lib/classifier');

const key = process.env.key;
const secret = process.env.secret;


 const rekognition = new AWS.Rekognition({
    region: 'us-east-1',
    apiVersion: '2016-06-27',
    accessKeyId: key,
    secretAccessKey: secret
});

const analyzeByDataUri = classifier.analyze(rekognition, functions.byDataUri);

exports.handler = (event, context, callback) => {
        analyzeByDataUri(event)
        .then( (data) => {
            callback(null, message(data));
        })
        .catch((err) => {
            callback(null, message({msg: 'what!?'}));
        });

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