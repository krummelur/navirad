import {SET_STARTUP_TOGGLE} from "../actions/toggleStartupActions";

export function toggleStartupReducer (state = true, action){

    switch(action.type){
        case SET_STARTUP_TOGGLE:
            return action.payload;
        default:
            return state;
    }
}