import {AISHUB_CONFIG} from "../apiConfig";
import { firebaseApp} from "../../Util/authenticator";
export const constants = {
    BOAT_FETCH_SUCCESS: "BOAT_FETCH_SUCCESS",
    BOAT_FETCH_FAILURE: "BOAT_FETCH_FAILURE",
};

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

export const fetchBoatsAction = () => {
    return dispatch => {
        firebaseApp
            .database()
            .ref('boats')
            .on(value => {
              if(value.lastFetch < Math.floor(Date.now() - 60))
                  dispatch;
              else {
                  fetchBoats(20.5,30.8,-15,18.6)
                      .then(result => {
                          .ref("boats").set({lastFetch: Date.now(), boats: result});
                          return result
                              .then(result => {dispatch(fetchSuccessAction(result))})
                      })
              }
            })
    }
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

const fetchSuccessAction = (boats) => { return { type: constants.BOAT_FETCH_SUCCESS, payload: boats}};
const fetchFailureAction = (error) => { return { type: constants.BOAT_FETCH_FAILURE, payload: error}};