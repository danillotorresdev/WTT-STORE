import axios from 'axios';
import { put } from 'redux-saga/effects';
import ActionCreators from '../actionCreators';
import { baseUrl1 } from '../../service/API';

export function* getUsers() {
    const usuarios = yield axios.get(`${baseUrl1}/usuarios`);
    yield put(ActionCreators.getUsersSuccess(usuarios.data));
}
