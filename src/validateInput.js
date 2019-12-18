import Validator from 'validator';

export default function validateInput(data) {

    let errors = {};

    if (Validator.isEmpty(data.userID))
        errors.userID = "UserID is required!";

    if (Validator.isEmpty(data.password))
        errors.password = "Password is required!";

    if (!Validator.isEmail(data.eMail))
        errors.eMail = "Input is not an E-Mail!"

    if (Validator.isEmpty(data.eMail))
        errors.eMail = "E-Mail is required!";


    if (data.loginForm)
        if (Validator.isEmpty(data.userID) || Validator.isEmpty(data.password))
            errors.login = "Invalid username or password!";
        else
            errors = {};

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

function isEmpty(object) {
    return Object.keys(object).length === 0;
}