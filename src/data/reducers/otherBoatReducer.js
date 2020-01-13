const defaultState = {
    lastFetch: null,
    boats: {}
};

export function otherBoatReducer(state = defaultState, action) {
    if(action.type === "FETCH_BOATS")
        if(state.lastFetch && state.lastFetch < Math.floor(Date.now()))
            return {...state, lastFetch: Date.now(), boats: action.payload};
        else
            return state;
    else
        return state;
}