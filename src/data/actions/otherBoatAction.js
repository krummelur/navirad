import { AISHUB_API_KEY } from "../apiConfig";
import firebaseApp from "../../Util/firebase";
import { getDatabase, off, onValue, ref, update} from "firebase/database";
export const constants = {
    BOAT_FETCH_SUCCESS: "BOAT_FETCH_SUCCESS",
    BOAT_FETCH_FAILURE: "BOAT_FETCH_FAILURE",
};

const writeBoatsToFirebase = (boats) => {
        const db = getDatabase()
        const data = { "boats": { ...boats, lastFetch: Date.now() } }
        update(ref(db), boats, data)
            .catch(console.error)
};

export const stopListeningForBoatsAction = () => {
    return dispatch => {
        off(ref(getDatabase(), 'boats'))
        dispatch(fetchSuccessAction([]))
    }
}

export const fetchBoatsAction = () => {
    return dispatch => {
        // Do nothing, AIS API not available
    }
};



const fetchBoats = (latmin, latmax, lonmin, lonmax) => {
    return fetch(
        
        `https://aishub-proxy.herokuapp.com/https://data.aishub.net/ws.php?username=${AISHUB_API_KEY}` +
        `&format=1&output=json&compress=0&latmin=${latmin}&latmax=${latmax}&lonmin=${lonmin}&lonmax=${lonmax}`, {
            origin: 'GET'
        })
        .then(results => results.json())
};

const fetchSuccessAction = (boats) => {
    return { type: constants.BOAT_FETCH_SUCCESS, payload: boats }
};
const fetchFailureAction = (error) => {
    return { type: constants.BOAT_FETCH_FAILURE, payload: error }
};