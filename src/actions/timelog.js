import { reset } from 'redux-form';
import { browserHistory } from 'react-router';
import { getData, postData, putData, deleteData } from './index';
import { FETCH_TIMELOGS, FILTER_TIMELOGS, ADD_TIMELOG, UPDATE_TIMELOG, DELETE_TIMELOG, TIMELOG_ERROR, FETCH_SINGLE_TIMELOG } from './types';


//= ===============================
// Timelog actions
//= ===============================
export function fetchTimelogs() {
  const url = '/timelog';
  return dispatch => getData(FETCH_TIMELOGS, TIMELOG_ERROR, true, url, dispatch);
}

export function filterTimelogs(filterData) {
  const url = `/timelog/filter?startDate=${filterData.from_date}&endDate=${filterData.to_date}`;
  return dispatch => getData(FILTER_TIMELOGS, TIMELOG_ERROR, true, url, dispatch);
}

export function fetchTimelog(timelogId) {
  const url = `/timelog/${timelogId}`;
  return dispatch => getData(FETCH_SINGLE_TIMELOG, TIMELOG_ERROR, true, url, dispatch);
}

export function addTimelog( timelogData ) {
  const data = { timelogData };
  const url = `/timelog/new/`;
  return (dispatch) => {
    postData(ADD_TIMELOG, TIMELOG_ERROR, true, url, dispatch, data);

    // Clear form after message is sent
    dispatch(reset('composeTimelog'));
    browserHistory.push(`/dashboard/timelog/`);
    //browserHistory.push(`/dashboard/timelog/view/${response.data._id}`);
  };
}

export function updateTimelog( timelogId, timelogData ) {
  const data = { timelogData };
  const url = `/timelog/${timelogId}/`;
  return (dispatch) => {
    putData(UPDATE_TIMELOG, TIMELOG_ERROR, true, url, dispatch, data);

    // Clear form after message is sent
    dispatch(reset('composeTimelog'));
    browserHistory.push(`/dashboard/timelog/`);
    //browserHistory.push(`/dashboard/timelog/view/${response.data._id}`);
  };
}

export function deleteTimelog(timelogId) {
  const url = `/timelog/${timelogId}`;
  return (dispatch) => {
    deleteData(DELETE_TIMELOG, TIMELOG_ERROR, true, url, dispatch);

    //back to the timesheet
    browserHistory.push(`/dashboard/timelog/`); 
  }
}