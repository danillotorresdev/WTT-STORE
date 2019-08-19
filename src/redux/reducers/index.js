import { combineReducers } from 'redux';
import users from './users';
import books from './books';

const rootReducer = combineReducers({
  users,
  books,
});

export default rootReducer;
