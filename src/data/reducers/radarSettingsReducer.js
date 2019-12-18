import {constants} from "../actions/radarActions";

const defaultState = {
    radarCenter: undefined,
    beamwidth: 4,
    rainInterference: false,
    radarInterference: false
}

export function radarSettingsReducer(state = defaultState, action) {
    switch (action.type) {
        case constants.SET_RADAR_BEAMWIDTH:
            return { ...state, beamwidth: action.payload };
        case constants.SET_RAIN_INTERFERENCE:
            return {...state, rainInterference: action.payload};
        case constants.SET_RADAR_INTERFERENCE:
            return {...state, radarInterference: action.payload};
        case constants.SET_RADAR_CENTER:
            return {...state, radarCenter: action.payload};
        default:
            return state;
    }
}