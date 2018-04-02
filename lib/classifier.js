
const validateInput = (event)  => event.body && JSON.parse(event.body).analyze;


exports.analyze = (rekognition, func) => {
    return (event) => {
        const analyze = validateInput(event);
        if (!analyze){
            return Promise.reject({message: 'invalid input'});
        }

        return func(rekognition, analyze);
    }; 
}


exports.validateInput = validateInput;