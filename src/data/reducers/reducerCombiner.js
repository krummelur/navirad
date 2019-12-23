import {combineReducers} from "redux";
import {radarSettingsReducer} from "./radarSettingsReducer";

const combinedReducers = combineReducers({
    radarSettings: radarSettingsReducer
});

export default combinedReducers;