export const constants = {
    SET_RADAR_BEAMWIDTH: "SET_RADAR_BEAMWIDTH",
    GET_RADAR_BEAMWIDTH: "GET_RADAR_BEAMWIDTH",
    SET_RAIN_INTERFERENCE: "SET_RAIN_INTERFERENCE",
    SET_RADAR_INTERFERENCE: "SET_RADAR_INTERFERENCE",
    SET_RADAR_CENTER: "SET_RADAR_CENTER",
};

export function setBeamWidth(num) {
    return {
        type: constants.SET_RADAR_BEAMWIDTH,
        payload: num
    }
}

export function getBeamWidth(beam) {
    return {
        type: constants.GET_RADAR_BEAMWIDTH,
        payload: beam
    }
}

export function setRain(load) {
    return {
        type: constants.SET_RAIN_INTERFERENCE,
        payload: load
    }
}

export function setInterference(load) {
    return {
        type: constants.SET_RADAR_INTERFERENCE,
        payload: load
    }
}