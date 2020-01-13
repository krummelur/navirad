import {combineReducers} from "redux";
import {radarSettingsReducer} from "./radarSettingsReducer";
import { placesReducer } from "./placesReducer";
import { messageReducer } from "./messagesReducer";
import { otherBoatsReducer} from "./otherBoatsReducer";

const combinedReducers = combineReducers({
    radarSettings: radarSettingsReducer,
    places: placesReducer,
    message: messageReducer,
    otherBoats: otherBoatsReducer
});

export default combinedReducers;