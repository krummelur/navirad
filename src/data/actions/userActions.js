export const constants = {
    ADD_USER: "ADD_USER",
    GET_USER: "GET_USER"
};

export const userActions = {
    addUser: (user) => {
        return{
            type: constants.ADD_USER,
            payload: user
        }
    },
    getUser: (user) => {
        return {
            type: constants.GET_USER,
            payload: user
        }
    }
};