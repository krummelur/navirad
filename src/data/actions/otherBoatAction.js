<<<<<<< HEAD
import { AISHUB_API_KEY } from "../apiConfig";
import firebaseApp from "../../Util/firebase";
=======
import {AISHUB_CONFIG} from "../apiConfig";
import firebaseApp from "../../Util/firebase";

>>>>>>> db71b53660260742f799d37c8ea3d11a3b68a470
export const constants = {
    BOAT_FETCH_SUCCESS: "BOAT_FETCH_SUCCESS",
    BOAT_FETCH_FAILURE: "BOAT_FETCH_FAILURE",
};

const writeBoatsToFirebase = (boats) => {
    firebaseApp
        .database()
        .ref("")
        .update({"boats": {...boats, lastFetch: Date.now()}}, function (error) {
            if (error) {
                console.log(error)
            }
        })
};

export const fetchBoatsAction = () => {
    return dispatch => {
        firebaseApp
            .database()
            .ref('boats')
            .on('value', value => {
                console.log(value.val())
                if (!value.val() || value.val().lastFetch < Date.now() - 65000) {
                    fetchBoats(20.5, 30.8, -15, 18.6)
                        .then(res => {
                            dispatch(fetchSuccessAction(res))
                            writeBoatsToFirebase()
                        })
                } else
                    dispatch(fetchSuccessAction(value.val()))
            });
    }
};


const fetchBoats = (latmin, latmax, lonmin, lonmax) => {
    return fetch(
<<<<<<< HEAD
        `https://data.aishub.net/ws.php?username=${AISHUB_API_KEY}`+
=======
        `https://data.aishub.net/ws.php?username=${AISHUB_CONFIG.apiKey}` +
>>>>>>> db71b53660260742f799d37c8ea3d11a3b68a470
        `&format=1&output=json&compress=0&latmin=${latmin}&latmax=${latmax}&lonmin=${lonmin}&lonmax=${lonmax}`)
        .then(results => results.json())
};

const fetchSuccessAction = (boats) => {
    return {type: constants.BOAT_FETCH_SUCCESS, payload: boats}
};
const fetchFailureAction = (error) => {
    return {type: constants.BOAT_FETCH_FAILURE, payload: error}
};