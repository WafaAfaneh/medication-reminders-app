import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ReminderActions from './reminder.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getReminder(api, action) {
  const { reminderId } = action;
  // make the call to the api
  const apiCall = call(api.getReminder, reminderId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(ReminderActions.reminderSuccess(response.data));
  } else {
    yield put(ReminderActions.reminderFailure(response.data));
  }
}

function* getAllReminders(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllReminders, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ReminderActions.reminderAllSuccess(response.data, response.headers));
  } else {
    yield put(ReminderActions.reminderAllFailure(response.data));
  }
}

function* updateReminder(api, action) {
  const { reminder } = action;
  // make the call to the api
  const idIsNotNull = !(reminder.id === null || reminder.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateReminder : api.createReminder, reminder);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(ReminderActions.reminderUpdateSuccess(response.data));
  } else {
    yield put(ReminderActions.reminderUpdateFailure(response.data));
  }
}

function* deleteReminder(api, action) {
  const { reminderId } = action;
  // make the call to the api
  const apiCall = call(api.deleteReminder, reminderId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ReminderActions.reminderDeleteSuccess());
  } else {
    yield put(ReminderActions.reminderDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.date = convertDateTimeFromServer(data.date);
  return data;
}

export default {
  getAllReminders,
  getReminder,
  deleteReminder,
  updateReminder,
};
