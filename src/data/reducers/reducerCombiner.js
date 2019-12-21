import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {radarSettingsReducer} from "./radarSettingsReducer";

const combinedReducers = combineReducers({
    users: userReducer,
    radarSettings: radarSettingsReducer
});

export default combinedReducers;