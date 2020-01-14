import { AISHUB_API_KEY } from "../apiConfig";
import firebaseApp from "../../Util/firebase";

export const constants = {
    BOAT_FETCH_SUCCESS: "BOAT_FETCH_SUCCESS",
    BOAT_FETCH_FAILURE: "BOAT_FETCH_FAILURE",
};

const writeBoatsToFirebase = (boats) => {
    firebaseApp
        .database()
        .ref('boats')
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
                if (!value.val() || value.val().boats.lastFetch < Date.now() - 65000) {
                    fetchBoats(20.5, 30.8, -15, 18.6)
                        .then(res => {
                            writeBoatsToFirebase(res);
                            console.log("res:");
                            console.log(res);
                            dispatch(fetchSuccessAction(res[1]));
                        })
                        .catch(function (error) {
                            dispatch(fetchFailureAction(error));
                            console.log(error);
                        })
                } else {
                    dispatch(fetchSuccessAction(value.val().boats[1]));
                    console.log("unfetched:");
                    console.log(value.val().boats[1]);
                }

            });
    }
};



const fetchBoats = (latmin, latmax, lonmin, lonmax) => {
    return fetch(
        `https://cors-anywhere.herokuapp.com/https://data.aishub.net/ws.php?username=${AISHUB_API_KEY}` +
        `&format=1&output=json&compress=0&latmin=${latmin}&latmax=${latmax}&lonmin=${lonmin}&lonmax=${lonmax}`, {
            origin: 'GET'
        })
        .then(results => results.json())
        .then(console.log("boats fetched"))
};

const fetchSuccessAction = (boats) => {
    return {type: constants.BOAT_FETCH_SUCCESS, payload: boats}
};
const fetchFailureAction = (error) => {
    return {type: constants.BOAT_FETCH_FAILURE, payload: error}
};