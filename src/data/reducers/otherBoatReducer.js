import { constants} from "../actions/otherBoatAction";

const defaultState = {
    lastFetch: null,
    boats: {},
    error: null
};

export function otherBoatReducer(state = defaultState, action) {
    switch(action.type) {
        case constants.BOAT_FETCH_SUCCESS:
            return {
                ...state, lastFetch: Date.now(), boats: action.payload
            };
        case constants.BOAT_FETCH_FAILURE:
            return {
                boats: null,
                error: action.payload.error
            };
        default:
            return state;
    }
}