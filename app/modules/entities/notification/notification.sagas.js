import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import NotificationActions from './notification.reducer';
import { convertLocalDateFromServer } from '../../../shared/util/date-transforms';

function* getNotification(api, action) {
  const { notificationId } = action;
  // make the call to the api
  const apiCall = call(api.getNotification, notificationId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(NotificationActions.notificationSuccess(response.data));
  } else {
    yield put(NotificationActions.notificationFailure(response.data));
  }
}

function* getAllNotifications(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllNotifications, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(NotificationActions.notificationAllSuccess(response.data, response.headers));
  } else {
    yield put(NotificationActions.notificationAllFailure(response.data));
  }
}

function* updateNotification(api, action) {
  const { notification } = action;
  // make the call to the api
  const idIsNotNull = !(notification.id === null || notification.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateNotification : api.createNotification, notification);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(NotificationActions.notificationUpdateSuccess(response.data));
  } else {
    yield put(NotificationActions.notificationUpdateFailure(response.data));
  }
}

function* deleteNotification(api, action) {
  const { notificationId } = action;
  // make the call to the api
  const apiCall = call(api.deleteNotification, notificationId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(NotificationActions.notificationDeleteSuccess());
  } else {
    yield put(NotificationActions.notificationDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.startDate = convertLocalDateFromServer(data.startDate);
  return data;
}

export default {
  getAllNotifications,
  getNotification,
  deleteNotification,
  updateNotification,
};
