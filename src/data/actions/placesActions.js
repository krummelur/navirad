import firebaseApp from "../../Util/firebase";
import { getAuth } from "firebase/auth";
import { showErrorAction, showMessageAction } from './messageActions'
import { getDatabase, ref, onValue, update, remove } from "firebase/database";

export const constants = {
    PLACES_FETCH_SUCCESS: "PLACES_FETCH_SUCCESS",
    PLACES_FETCH_FAILURE: "PLACES_FETCH_FAILURE",
    ADD_PLACE_SUCCESS: "ADD_PLACE_SUCCESS",
    ADD_PLACE_FAILURE: "ADD_PLACE_FAILURE",
    REMOVE_PLACE_SUCCESS: "REMOVE_PLACE_SUCCESS"
};

export const fetchPlacesAction = () => {
    const { currentUser } = getAuth()
    return dispatch => {
        const db = getDatabase();
        onValue(ref(db, `places/${currentUser.uid}`), snapshot => {
            dispatch({ type: constants.PLACES_FETCH_SUCCESS, payload: snapshot.val() || [] });
        });
    };
};

export const addPlaceAction = (place) => {
    if (typeof place.name !== 'string')
        throw new Error("name must be string!");
    const { currentUser } = getAuth()
    const childObject = {};
    childObject[place.name] = { lat: place.lat, lon: place.lon };
    return dispatch => {
        if (place.name === "")
            dispatch(showErrorAction("Enter a name for the location first!"));
        else {
            //get state once to see if it exists, then add / update
            const db = getDatabase();
            onValue(ref(db, `places/${currentUser.uid}/${place.name}`), prevSnap => {    
                const userLocationsRef = ref(db, `places/${currentUser.uid}`);
                 update(userLocationsRef, childObject)
                 .then(() => {
                    let didExist = prevSnap.exists();
                    dispatch(showMessageAction(`Location ${place.name}  ${didExist ? "updated" : "saved"}!`));
                    dispatch(addPlaceSuccessAction(place));
                 })
                 .catch(e => {
                     dispatch(showErrorAction(`could not save location ${place.name}!`));
                    dispatch(addPlaceFailureAction(place));
                 })
            }, {onlyOnce: true})
        }
    }
};

export const removePlaceAction = (place) => {
    if (typeof place.name !== 'string')
        throw new Error("name must be string!");
    const { currentUser } = getAuth()
    return dispatch => {
        const db = getDatabase();
        remove(ref(db, `places/${currentUser.uid}/${place.name}`))
        .then(function () {
            dispatch(showMessageAction(`Location ${place.name} removed!`));
            dispatch(removePlaceSuccessAction(place));
        })
        .catch(function (error) {
            dispatch(showErrorAction(`could not delete location ${place.name}!`));
            console.log("Remove failed: " + error.message)
        });
    }
};

const addPlaceSuccessAction = (newPlace) => {
    return { type: constants.ADD_PLACE_SUCCESS, payload: newPlace }
};
const addPlaceFailureAction = (error) => {
    return { type: constants.ADD_PLACE_FAILURE, payload: error }
};
const removePlaceSuccessAction = (removedPlace) => {
    return { type: constants.REMOVE_PLACE_SUCCESS, payload: removedPlace }
};
