import {setRadarCenter, setBeamWidth, setRain, setInterference, setUnderlay, setOtherBoats} from "../data/actions/radarActions";

export const restoreState = (store) => {
    let storedRadarSettings = localStorage.getItem("radarSettings");
    if (storedRadarSettings) {
        storedRadarSettings = JSON.parse(storedRadarSettings);
        storedRadarSettings.radarCenter && store.dispatch(setRadarCenter(storedRadarSettings.radarCenter));
        storedRadarSettings.beamwidth && store.dispatch(setBeamWidth(storedRadarSettings.beamwidth));
        storedRadarSettings.rainInterference && store.dispatch(setRain(storedRadarSettings.rainInterference));
        storedRadarSettings.radarInterference && store.dispatch(setInterference(storedRadarSettings.radarInterference));
        storedRadarSettings.showMapUnderlay && store.dispatch(setUnderlay(storedRadarSettings.showMapUnderlay));
        storedRadarSettings.otherBoats && store.dispatch(setOtherBoats(storedRadarSettings.otherBoats));
    }
};

export const saveState = (currentState) => {
    localStorage.setItem("radarSettings", JSON.stringify(currentState.radarSettings));
};