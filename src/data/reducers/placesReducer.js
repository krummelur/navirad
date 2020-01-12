import { constants } from "../actions/placesActions";

//Dishes reducer
export function placesReducer(state = {result: [],  error: null}, action) {
  switch (action.type) {
    case constants.PLACES_FETCH_SUCCESS:
      let result = [];
      for (let k in action.payload)
       result.push({name: k, ...action.payload[k]})
      return {
        result: result, 
        error: null
      }; 
    case constants.PLACES_FETCH_FAILURE:
      return {
        result: null,
        error: action.payload.error
      }; 
    case constants.ADD_PLACE_SUCCESS:
      return {
        result: [...state.result, action.payload],
        error: null
      };
    case constants.ADD_PLACE_FAILURE:
      return {
        result: [...state.result],
        error: action.payload.error
      };
    default:
      return state;
  }
}