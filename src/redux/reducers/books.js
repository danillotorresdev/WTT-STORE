import { createReducer } from 'reduxsauce';
import { Types } from '../actionCreators';

export const INITIAL_STATE = {
  isLoading: false,
  data: [],
  booksInCart: [],
};

export const getBooksRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    isLoading: true,
  };
};

export const getBooksSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    data: action.books,
  };
};

export const getBooksFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    isLoading: false,
  };
};


export const saveBooksInCartSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    booksInCart: action.booksInCart.booksInCart,
  };
};

export const HANDLERS = {
  [Types.GET_BOOKS_REQUEST]: getBooksRequest,
  [Types.GET_BOOKS_SUCCESS]: getBooksSuccess,
  [Types.GET_BOOKS_FAILURE]: getBooksFailure,
  [Types.SAVE_BOOKS_IN_CART_SUCCESS]: saveBooksInCartSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
