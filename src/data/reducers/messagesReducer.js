import { constants } from "../actions/messageActions";
const uuid = require('uuid/v4');

export function messageReducer(state = null, action) {
    switch (action.type) {
      case constants.SET_MESSAGE:
          return {
          id: uuid(), 
          isError: action.payload.isError,
          text: action.payload.text
        }; 
      default:
        return state;
    }
  }