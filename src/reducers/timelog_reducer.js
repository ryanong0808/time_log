import { FETCH_TIMELOGS, FILTER_TIMELOGS, ADD_TIMELOG, DELETE_TIMELOG, UPDATE_TIMELOG, FETCH_SINGLE_TIMELOG, TIMELOG_ERROR } from '../actions/types';
var _ = require('lodash')
const INITIAL_STATE = { timelog: {}, timelogs: [], error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TIMELOGS:
      return { ...state, timelogs: action.payload.timelogs };
    case FILTER_TIMELOGS:
      return { ...state, timelogs: action.payload.timelogs };  
    case FETCH_SINGLE_TIMELOG:
      return { ...state, timelog: action.payload.timelog };
    case ADD_TIMELOG:
      return { ...state, timelog: action.payload.timelog };
    case DELETE_TIMELOG:
      state.timelogs = _.filter(state.timelogs, (timelog) => { return timelog._id != action.payload.timelog._id });
      return { ...state, timelog: action.payload.timelog };  
    case UPDATE_TIMELOG:
      return { ...state, timelog: action.payload.timelog };  
    case TIMELOG_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
