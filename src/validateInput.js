import Validator from 'validator';

export function validateLoginInput(data) {

    const messages = {};
  
        if (Validator.isEmpty(data.userID) || Validator.isEmpty(data.password))
            messages.login = "Invalid username or password!";
        

    return {
        messages,
        isValid: isEmpty(messages)
    };
}

export function validateRegisterInput(data) {

    const messages = {};

    if (Validator.isEmpty(data.userID))
        messages.userID = "UserID is required!";

    if (Validator.isEmpty(data.password))
        messages.password = "Password is required!";

    if (!Validator.isEmail(data.eMail))
        messages.eMail = "Input is not an E-Mail!"

    if (Validator.isEmpty(data.eMail))
        messages.eMail = "E-Mail is required!";


     return {
        messages,
        isValid: isEmpty(messages)
     };
}

function isEmpty(object) {
    return Object.keys(object).length === 0;
}