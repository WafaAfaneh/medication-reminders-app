import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import TimeOfDayActions from './time-of-day.reducer';

function* getTimeOfDay(api, action) {
  const { timeOfDayId } = action;
  // make the call to the api
  const apiCall = call(api.getTimeOfDay, timeOfDayId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(TimeOfDayActions.timeOfDaySuccess(response.data));
  } else {
    yield put(TimeOfDayActions.timeOfDayFailure(response.data));
  }
}

function* getAllTimeOfDays(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllTimeOfDays, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(TimeOfDayActions.timeOfDayAllSuccess(response.data, response.headers));
  } else {
    yield put(TimeOfDayActions.timeOfDayAllFailure(response.data));
  }
}

function* updateTimeOfDay(api, action) {
  const { timeOfDay } = action;
  // make the call to the api
  const idIsNotNull = !(timeOfDay.id === null || timeOfDay.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateTimeOfDay : api.createTimeOfDay, timeOfDay);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(TimeOfDayActions.timeOfDayUpdateSuccess(response.data));
  } else {
    yield put(TimeOfDayActions.timeOfDayUpdateFailure(response.data));
  }
}

function* deleteTimeOfDay(api, action) {
  const { timeOfDayId } = action;
  // make the call to the api
  const apiCall = call(api.deleteTimeOfDay, timeOfDayId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(TimeOfDayActions.timeOfDayDeleteSuccess());
  } else {
    yield put(TimeOfDayActions.timeOfDayDeleteFailure(response.data));
  }
}

export default {
  getAllTimeOfDays,
  getTimeOfDay,
  deleteTimeOfDay,
  updateTimeOfDay,
};
