import Validator from 'validator';

export function validateLoginInput(data) {

    let message = "";

    if (Validator.isEmpty(data.eMail.value) || Validator.isEmpty(data.password.value))
        message = "Invalid username or password!";

    return {
        message: message,
        isValid: isEmpty(message)
    };
}

export function validateRegisterInput(data) {

    const messages = {};

    if (Validator.isEmpty(data.userID))
        messages.userID = "UserID is required!";

    if (Validator.isEmpty(data.password))
        messages.password = "Password is required!";

    if (!Validator.isEmail(data.eMail))
        messages.eMail = "Input is not an E-Mail!";

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