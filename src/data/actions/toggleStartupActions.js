export const SET_STARTUP_TOGGLE = "SET_STARTUP_TOGGLE";

export const setStartupToggle = (toggleState) => {
    return {
        type: SET_STARTUP_TOGGLE,
        payload: toggleState
    }
};