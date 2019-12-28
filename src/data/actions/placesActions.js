import { firebaseApp } from "../../Util/authenticator";

export const constants = {
  PLACES_FETCH_SUCCESS: "PLACES_FETCH_SUCCESS",
  ADD_PLACE_SUCCESS: "ADD_PLACE_SUCCESS"
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
    throw "name must be string!";
  const { currentUser } = firebaseApp.auth();
  return dispatch => {
    firebaseApp
    .database()
    .ref(`places/${currentUser.uid}`)
    .push(place)
      .then(() => {
        dispatch(addPlaceSuccessAction(place));
      })
  }
}

const addPlaceSuccessAction = (newPlace) => { return { type: constants.ADD_PLACE_SUCCESS, payload: newPlace }};
