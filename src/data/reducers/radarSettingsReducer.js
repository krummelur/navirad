import {constants} from "../actions/radarActions";

const defaultState = {
    radarCenter: { lat: 59.440503, lon: 18.734038, initialCenter: true },
    beamwidth: 4,
    rainInterference: false,
    radarInterference: false,
    showMapUnderlay: false,
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
            return {...state, radarCenter: {...action.payload, initialCenter: false}};
        case constants.SET_MAP_UNDERLAY:
            return {...state, showMapUnderlay: action.payload};
        default:
            return state;
    }
}