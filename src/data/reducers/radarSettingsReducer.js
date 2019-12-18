import {constants} from "../actions/radarActions";

export function radarSettingsReducer(state = {}, action) {
    switch (action.type) {
        case constants.SET_RADAR_BEAMWIDTH:
            return { ...state, beamwidth: action.payload };
        case constants.GET_RADAR_BEAMWIDTH:
            return state.radarSettings.beamwidth;
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