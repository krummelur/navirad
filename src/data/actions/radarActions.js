export const constants = {
    SET_RADAR_BEAMWIDTH: "SET_RADAR_BEAMWIDTH",
    SET_RAIN_INTERFERENCE: "SET_RAIN_INTERFERENCE",
    SET_RADAR_INTERFERENCE: "SET_RADAR_INTERFERENCE",
    SET_RADAR_CENTER: "SET_RADAR_CENTER",
    SET_OTHER_BOATS: "SET_OTHER_BOATS",
    MOVE_RADAR_CENTER: "MOVE_RADAR_CENTER",
    SET_MAP_UNDERLAY: "SET_MAP_UNDERLAY",
};

export function setRadarCenter(newCenter) {
    return {
        type: constants.SET_RADAR_CENTER,
        payload: newCenter
    }
}

export function setOtherBoats(shouldDisplay) {
    return {
        type: constants.SET_OTHER_BOATS,
        payload: shouldDisplay
    }
}

export function moveRadarCenter(delta) {
    return {
        type: constants.MOVE_RADAR_CENTER,
        payload: delta
    }
}

export function setBeamWidth(num) {
    return {
        type: constants.SET_RADAR_BEAMWIDTH,
        payload: num
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

export function setUnderlay(load) {
    return {
        type: constants.SET_MAP_UNDERLAY,
        payload: load
    }
}