module.exports = class Classifier {

    constructor(rekognition){
        this.rekognition = rekognition;
    }

    byDataURI(dataURI){


        let params = {
            Image: {
                Bytes: Buffer.from(dataURI,'base64')
            },
            MaxLabels: 20,
            MinConfidence: 25
        };


        return new Promise( (resolve, reject) => {

            this.rekognition.detectLabels(params, function(err, data) {
                if (err) resolve(err) 
                else     resolve(data);
            });

        });


    }

}