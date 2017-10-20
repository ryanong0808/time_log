//= =====================
// Auth Actions
//= =====================
export const AUTH_USER = 'auth_user',
  UNAUTH_USER = 'unauth_user',
  AUTH_ERROR = 'auth_error',
  FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
  RESET_PASSWORD_REQUEST = 'reset_password_request',
  PROTECTED_TEST = 'protected_test';

//= =====================
// User Profile Actions
//= =====================
export const FETCH_USER = 'fetch_user';

//= =====================
// Timelog Actions
//= =====================
export const FETCH_TIMELOGS = 'fetch_timelogs',
  ADD_TIMELOG = 'add_timelog',
  DELETE_TIMELOG = 'delete_timelog',
  UPDATE_TIMELOG = 'update_timelog',
  FETCH_SINGLE_TIMELOG = 'fetch_single_timelog',
  TIMELOG_ERROR = 'timelog_error',
  FILTER_TIMELOGS = 'filter_timelogs';

//= =====================
// Page Actions
//= =====================
export const SEND_CONTACT_FORM = 'send_contact_form',
  STATIC_ERROR = 'static_error';

//= =====================
// User Actions
//= =====================
export const UPDATE_USER = 'update_user',
  UPDATE_EDIT_USER = 'update_edit_user',
  ADD_USER = 'add_user',
  FETCH_EDIT_USER = 'fetch_edit_user',
  FETCH_USERS = 'fetch_users',
  DELETE_USER = 'delete_user';