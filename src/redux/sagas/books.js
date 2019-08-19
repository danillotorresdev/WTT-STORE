import axios from 'axios';
import { put } from 'redux-saga/effects';
import ActionCreators from '../actionCreators';
import { baseUrl1 } from '../../service/API';

export function* getBooks() {
  const url = `${baseUrl1}/livros`;
  const books = yield axios.get(url);
  yield put(ActionCreators.getBooksSuccess(books.data));
}
