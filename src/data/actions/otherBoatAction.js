import {AISHUB_CONFIG} from "../apiConfig";
import { firebaseApp} from "../../Util/authenticator";

export const fetchBoatsFromFirebase = () => {
    const { currentUser } = firebaseApp.auth();
    return dispatch =>  {
            firebaseApp
                .database()
                .ref('boats/')
                .on('value', snapshot => {
                    snapshot.val() && dispatch({type: FETCH_BOATS, payload: snapshot.val()})
                })
    };
};

export const fetchBoats =  (latmin, latmax, lonmin, lonmax) => {
    return fetch(
        "http://data.aishub.net/ws.php?username=" + AISHUB_CONFIG.apiKey +
        "&format=1&output=json&compress=0&latmin=" + latmin +
        "&latmax=" + latmax +
        "&lonmin=" + lonmin +
        "&lonmax=" + lonmax)
        .then(results => results.json())
};