import { SET_SEARCH_STRING } from "../constants/types";

export const setSearchString = myString => dispatch => {
  dispatch({
    type: SET_SEARCH_STRING,
    payload: myString
  });
};