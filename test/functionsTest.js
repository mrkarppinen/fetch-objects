const td = require("testdouble");
const chai = require("chai");
const expect = chai.expect;
const tdChai = require("testdouble-chai");
const functions = require('../lib/functions');

const response = require('./resources/example-response.json');

chai.use(tdChai(td)); 

describe('functions', function (){

    let endpoint;
    let dataURI = 'SGVsbG8sIFdvcmxkIQ%3D%3D';
    let body = JSON.stringify({analyze: dataURI});

     before( function (){
        endpoint = td.object(['detectLabels']);

        let params = {
            Image: {
                Bytes: Buffer.from(dataURI,'base64')
            },
            MaxLabels: 20,
            MinConfidence: 25
        };

        td.when(endpoint.detectLabels(params)).thenCallback(null, response);
     });   


     describe('byDataURI', function (){

        it("valid request", function() {
            
                return functions.byDataUri(endpoint, dataURI).then( (response) => {
                    
                    expect(response['Labels']).not.to.be.null;
                    expect(response.Labels[0].Name).to.equal('beacon');

                });
                
                
        });

    });





});
