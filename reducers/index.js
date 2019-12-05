import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import itemsReducer from './itemsReducer';

export default combineReducers({
    search: searchReducer,
    items: itemsReducer,
});