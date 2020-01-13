import {combineReducers} from "redux";
import {radarSettingsReducer} from "./radarSettingsReducer";
import { placesReducer } from "./placesReducer";
import { messageReducer } from "./messagesReducer";

const combinedReducers = combineReducers({
    radarSettings: radarSettingsReducer,
    places: placesReducer,
    message: messageReducer
});

export default combinedReducers;