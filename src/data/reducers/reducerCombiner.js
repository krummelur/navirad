import {combineReducers} from "redux";
import {toggleStartupReducer} from "./toggleStartupReducer";
import {userReducer} from "./userReducer";
import {radarCenterReducer} from "./radarCenterReducer";
import {radarSettingsReducer} from "./radarSettingsReducer"

const combinedReducers = combineReducers({
    users: userReducer,
    toggleStartup: toggleStartupReducer,
    radarCenter: radarCenterReducer,
    radarSettings: radarSettingsReducer
});

export default combinedReducers;