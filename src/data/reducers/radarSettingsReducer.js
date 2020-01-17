import {constants} from "../actions/radarActions";

const defaultState = {
    radarCenter: {lat: 59.440503, lon: 18.734038, initialCenter: true},
    beamwidth: 4,
    rainInterference: false,
    radarInterference: false,
    showMapUnderlay: false,
    otherBoats: false,
};

export function radarSettingsReducer(state = defaultState, action) {
    switch (action.type) {
        case constants.SET_OTHER_BOATS:
            return {...state, otherBoats: action.payload};
        case constants.SET_RADAR_BEAMWIDTH:
            return {...state, beamwidth: action.payload};
        case constants.SET_RAIN_INTERFERENCE:
            return {...state, rainInterference: action.payload};
        case constants.SET_RADAR_INTERFERENCE:
            return {...state, radarInterference: action.payload};
        case constants.SET_RADAR_CENTER:
            return {...state, radarCenter: {...action.payload, initialCenter: false}};
        case constants.MOVE_RADAR_CENTER:
            let newCenter = {};
            Object.keys(action.payload).forEach(k => {
                newCenter[k] = action.payload[k] + state.radarCenter[k]
            });
            return {...state, radarCenter: {...newCenter, initialCenter: false}};
        case constants.SET_MAP_UNDERLAY:
            return {...state, showMapUnderlay: action.payload};
        default:
            return state;
    }
}