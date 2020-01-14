import {constants} from "../actions/otherBoatAction";

const defaultState = {
    lastFetch: null,
    boats: [],
    error: null
};

export function otherBoatsReducer(state = defaultState, action) {
    switch (action.type) {
        case constants.BOAT_FETCH_SUCCESS:
            return {
                ...state, lastFetch: Date.now(), boats: action.payload
            };
        case constants.BOAT_FETCH_FAILURE:
            return {
                boats: [],
                error: action.payload.error
            };
        default:
            return state;
    }
}