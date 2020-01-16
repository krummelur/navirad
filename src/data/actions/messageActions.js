export const constants = {
    SET_MESSAGE: "SET_MESSAGE"
};

export const showErrorAction = (text) => {
    return {type: constants.SET_MESSAGE, payload: {text: text, isError: true}}
};
export const showMessageAction = (text) => {
    return {type: constants.SET_MESSAGE, payload: {text: text, isError: false}}
};