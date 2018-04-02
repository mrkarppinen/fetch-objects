const td = require("testdouble");
const chai = require("chai");
const expect = chai.expect;
const classifier = require('../lib/classifier');


describe('classifier', function (){

   
     const callback = (rekognition, data) => Promise.resolve([rekognition, data]);

     const data = '1234';
     const rekognition = '5678';
     const event = {body: JSON.stringify({analyze: data}) };

     describe('validateInput()', function (){

        it("valid input", function() {
                const ok = classifier.validateInput(event);
                expect(ok).equal(data);
        });

        it("invalid input", function() {
                const ok = classifier.validateInput({body: '{}'});
                expect(ok).to.be.undefined;
        });

    });

    describe('analyze', function (){

        it('should analyze', function (){

            const analyze = classifier.analyze(rekognition, callback);
            return analyze(event).then( (arr) => {
                expect(arr[0]).to.equal(rekognition);
                expect(arr[1]).to.equal(data);
            });

        });

    });


});
