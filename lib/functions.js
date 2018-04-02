


exports.byDataUri = (rekognition, dataURI) => {


        let params = {
            Image: {
                Bytes: Buffer.from(dataURI,'base64')
            },
            MaxLabels: 20,
            MinConfidence: 25
        };


        return new Promise( (resolve, reject) => {

            rekognition.detectLabels(params, function(err, data) {
                if (err) resolve(err) 
                else     resolve(data);
            });

        });


    };

