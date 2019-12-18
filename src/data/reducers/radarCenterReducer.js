export const constants = {
    SET_RADAR_CENTER:"SET_RADAR_CENTER"
};

export function radarCenterReducer(state = { lon: 18, lat: 59 }, action) {
    switch (action.type) {
        case constants.SET_RADAR_CENTER:
            return action.payload;
        default:
            return state;
    }
}