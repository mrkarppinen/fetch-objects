const td = require("testdouble");
const chai = require("chai");
const expect = chai.expect;
const tdChai = require("testdouble-chai");
const fs = require('fs');
const Classifier = require('../lib/classifier');

chai.use(tdChai(td)); 

describe('Classifier', function (){

    let endpoint;
    let classifier;
    let dataURI = 'SGVsbG8sIFdvcmxkIQ%3D%3D';

     before( function (){
        let response = JSON.parse(fs.readFileSync('./test/resources/example-response.json', 'utf8'));

        endpoint = td.object(['detectLabels']);

        let params = {
            Image: {
                Bytes: Buffer.from(dataURI,'base64')
            },
            MaxLabels: 20,
            MinConfidence: 25
        };

        td.when(endpoint.detectLabels(params)).thenCallback(null, response);
    
        classifier = new Classifier(endpoint); 
     });   


     describe('byDataURI', function (){

        it("valid request", function() {
            
                return classifier.byDataURI(dataURI).then( (response) => {
                    
                    expect(response['Labels']).not.to.be.null;
                    expect(response.Labels[0].Name).to.equal('beacon');

                });
                
                
        });

    });


});
