export const constants = {
    SET_RADAR_BEAMWIDTH:"SET_RADAR_BEAMWIDTH"
};

export function radarSettingsReducer(state = {}, action) {
    switch (action.type) {
        case "SET_RADAR_BEAMWIDTH":
            return { ...state, beamwidth: action.payload };
        case "SET_RAIN_INTERFERENCE":
            return {...state, rainInterference: action.payload};
        case "SET_RADAR_INTERFERENCE":
            return {...state, radarInterference: action.payload};
        default:
            return state;
    }
}