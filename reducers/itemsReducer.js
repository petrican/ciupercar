  
import {
    GET_ITEMS,
  } from '../constants/types';
  
  const initialState = {
    items: []
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_ITEMS:
        return {
          ...state,
          lookup: action.payload
        };
      default:
        return state;
    }
  }
  