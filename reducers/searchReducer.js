  
import {
    SET_SEARCH_STRING,
  } from '../constants/types';
  
  const initialState = {
    lookup: null,
    lastSearchedWord: null
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case SET_SEARCH_STRING:
        return {
          ...state,
          lookup: action.payload
        };
      default:
        return state;
    }
  }
  