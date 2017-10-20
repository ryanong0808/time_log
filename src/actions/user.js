import { reset } from 'redux-form';
import { browserHistory } from 'react-router';
import { getData, postData, putData, deleteData } from './index';
import { UPDATE_USER, ADD_USER, UPDATE_EDIT_USER, FETCH_USERS, FETCH_EDIT_USER, FETCH_USER, DELETE_USER, USER_ERROR } from './types';


//= ===============================
// User actions
//= ===============================
export function fetchUsers() {
  const url = '/user';
  return dispatch => getData(FETCH_USERS, USER_ERROR, true, url, dispatch);
}

export function fetchUser(userId) {
  const url = `/user/${userId}`;
  return dispatch => getData(FETCH_USER, USER_ERROR, true, url, dispatch);
}

export function fetchEditUser(userId) {
  const url = `/user/${userId}`;
  return dispatch => getData(FETCH_EDIT_USER, USER_ERROR, true, url, dispatch);
}

export function addUser( userData ) {
  const data = { userData };
  const url = `/user/`;
  return (dispatch) => {
    postData(ADD_USER, USER_ERROR, true, url, dispatch, data);

    // Clear form after user is sent
    dispatch(reset('compuseUser'));
    browserHistory.push(`/admin/user/`);
  };
}

export function updateUser( userId, userData ) {
  const data = { userData };
  const url = `/user/${userId}/`;
  return (dispatch) => {
    putData(UPDATE_USER, USER_ERROR, true, url, dispatch, data);

    // Clear form after user is sent
    dispatch(reset('editUser'));
    browserHistory.push(`/profile/edit/`);
  };
}

export function updateEditUser( userId, userData ) {
  const data = { userData };
  const url = `/user/${userId}/`;
  return (dispatch) => {
    putData(UPDATE_EDIT_USER, USER_ERROR, true, url, dispatch, data);

    // Clear form after user is sent
    dispatch(reset('editUser'));
  };
}

export function deleteUser(userId) {
  const url = `/user/${userId}`;
  return (dispatch) => {
    deleteData(DELETE_USER, USER_ERROR, true, url, dispatch);
    //back to the admin user board
    browserHistory.push(`/admin/user/`); 
  }
}