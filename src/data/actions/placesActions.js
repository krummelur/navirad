import { firebaseApp } from "../../Util/authenticator";
import { showErrorAction, showMessageAction } from './messageActions'
export const constants = {
  PLACES_FETCH_SUCCESS: "PLACES_FETCH_SUCCESS",
  PLACES_FETCH_FAILURE: "PLACES_FETCH_FAILURE",
  ADD_PLACE_SUCCESS: "ADD_PLACE_SUCCESS",
  ADD_PLACE_FAILURE: "ADD_PLACE_FAILURE"
}

export const fetchPlacesAction = () => {
  const { currentUser } = firebaseApp.auth();
  return dispatch => {
    firebaseApp
      .database()
      .ref(`places/${currentUser.uid}`)
      .on('value', snapshot => {
        snapshot.val() && dispatch({ type: constants.PLACES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const addPlaceAction = (place) => {
  console.log("Adding place")
  if(typeof place.name !== 'string') 
    throw new Error("name must be string!");
  const { currentUser } = firebaseApp.auth();
  const childObject = {};
  childObject[place.name] = {lat: place.lat, lon: place.lon}
  return dispatch => {
    firebaseApp
    .database()
    .ref(`places/${currentUser.uid}`)
    .update(childObject, function(error){
      if(error){
        dispatch(showErrorAction(`could not save location ${place.name}!`))
        dispatch(addPlaceFailureAction(place));
      }
      else{
        dispatch(showMessageAction(`Location ${place.name} saved!`))
        dispatch(addPlaceSuccessAction(place));
      }
    })
  }
}

const addPlaceSuccessAction = (newPlace) => { return { type: constants.ADD_PLACE_SUCCESS, payload: newPlace }};
const addPlaceFailureAction = (error) => { return { type: constants.ADD_PLACE_FAILURE, payload: error }};
