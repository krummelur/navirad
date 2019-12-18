import {combineReducers} from "redux";
import {toggleStartupReducer} from "./toggleStartupReducer";
import {userReducer} from "./userReducer";
import {radarSettingsReducer} from "./radarSettingsReducer";

const combinedReducers = combineReducers({
    users: userReducer,
    toggleStartup: toggleStartupReducer,
    radarSettings: radarSettingsReducer
});

export default combinedReducers;