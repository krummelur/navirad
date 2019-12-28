import {combineReducers} from "redux";
import {radarSettingsReducer} from "./radarSettingsReducer";
import { placesReducer } from "./placesReducer";

const combinedReducers = combineReducers({
    radarSettings: radarSettingsReducer,
    places: placesReducer
});

export default combinedReducers;