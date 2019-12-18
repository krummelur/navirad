import {constants} from "../actions/userActions";

export function userReducer(state = [], action){

    switch(action.type){
        case constants.ADD_USER:
            return [...state, action.payload];
        case constants.GET_USER:
            return state.forEach(user => {
                if(user.userID === action.payload.userID)
                    return user;
            });
        default:
            return state;
    }
}