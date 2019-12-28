import { constants } from "../actions/placesActions";

//Dishes reducer
export function placesReducer(state = [], action) {
  switch (action.type) {
    case constants.PLACES_FETCH_SUCCESS:
      return Object.values(action.payload)
    case constants.ADD_PLACE_SUCCESS:
      return [...state, action.payload]
    default:
      return state;
  }
}