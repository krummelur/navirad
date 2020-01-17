import firebaseApp from "../../Util/firebase";
import { showErrorAction, showMessageAction } from './messageActions'

export const constants = {
    PLACES_FETCH_SUCCESS: "PLACES_FETCH_SUCCESS",
    PLACES_FETCH_FAILURE: "PLACES_FETCH_FAILURE",
    ADD_PLACE_SUCCESS: "ADD_PLACE_SUCCESS",
    ADD_PLACE_FAILURE: "ADD_PLACE_FAILURE",
    REMOVE_PLACE_SUCCESS: "REMOVE_PLACE_SUCCESS"
};

export const fetchPlacesAction = () => {
    const { currentUser } = firebaseApp.auth();
    return dispatch => {
        let fbRef = firebaseApp.database().ref(`places/${currentUser.uid}`);
        fbRef.on('value', snapshot => {
            snapshot.val() && dispatch({ type: constants.PLACES_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const addPlaceAction = (place) => {
    if (typeof place.name !== 'string')
        throw new Error("name must be string!");
    const { currentUser } = firebaseApp.auth();
    const childObject = {};
    childObject[place.name] = { lat: place.lat, lon: place.lon };
    return dispatch => {
        if (place.name === "")
            dispatch(showErrorAction("Enter a name for the location first!"));
        else {
            let fbDB = firebaseApp.database();
            fbDB
                .ref(`places/${currentUser.uid}/${place.name}`)
                .once("value", prevSnap => {
                    fbDB
                        .ref(`places/${currentUser.uid}`)
                        .update(childObject, function (error) {
                            if (error) {
                                dispatch(showErrorAction(`could not save location ${place.name}!`));
                                dispatch(addPlaceFailureAction(place));
                            } else {
                                let didExist = prevSnap.exists();
                                dispatch(showMessageAction(`Location ${place.name}  ${didExist ? "updated" : "saved"}!`));
                                dispatch(addPlaceSuccessAction(place));
                            }
                        })
                })

        }
    }
};

export const removePlaceAction = (place) => {
    if (typeof place.name !== 'string')
        throw new Error("name must be string!");
    const { currentUser } = firebaseApp.auth();
    return dispatch => {
        firebaseApp
            .database()
            .ref(`places/${currentUser.uid}/${place.name}`)
            .remove()
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
