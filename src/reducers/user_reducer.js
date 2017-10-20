import { FETCH_USER, FETCH_USERS, FETCH_EDIT_USER, DELETE_USER, UPDATE_USER, ADD_USER, UPDATE_EDIT_USER, ERROR_RESPONSE } from '../actions/types';

const INITIAL_STATE = { profile: {}, users:[], edit_user:{}, message: '', error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, profile: action.payload.user };
    case FETCH_EDIT_USER:
      return { ...state, edit_user: action.payload.user };  
    case FETCH_USERS:
      return { ...state, users: action.payload.users };    
	  case DELETE_USER:
	    state.users = _.filter(state.users, (user) => { return user._id != action.payload.user._id });
	    return { ...state, profile: action.payload.user }; 
    case UPDATE_USER:
      return { ...state, profile: action.payload.user };
    case ADD_USER:
      return { ...state, edit_user: action.payload.user };  
    case UPDATE_EDIT_USER:
      return { ...state, edit_user: action.payload.user };    
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
  }

  return state;
}
