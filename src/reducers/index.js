import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import timelogReducer from './timelog_reducer';
const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  timesheet: timelogReducer,
});

export default rootReducer;
