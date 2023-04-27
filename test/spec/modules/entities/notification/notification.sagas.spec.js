import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import NotificationSagas from '../../../../../app/modules/entities/notification/notification.sagas';
import NotificationActions from '../../../../../app/modules/entities/notification/notification.reducer';

const { getNotification, getAllNotifications, updateNotification, deleteNotification } = NotificationSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getNotification(1);
  const step = stepper(getNotification(FixtureAPI, { notificationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NotificationActions.notificationSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getNotification(FixtureAPI, { notificationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NotificationActions.notificationFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllNotifications();
  const step = stepper(getAllNotifications(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NotificationActions.notificationAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllNotifications(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NotificationActions.notificationAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateNotification({ id: 1 });
  const step = stepper(updateNotification(FixtureAPI, { notification: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NotificationActions.notificationUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateNotification(FixtureAPI, { notification: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NotificationActions.notificationUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteNotification({ id: 1 });
  const step = stepper(deleteNotification(FixtureAPI, { notificationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(NotificationActions.notificationDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteNotification(FixtureAPI, { notificationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(NotificationActions.notificationDeleteFailure()));
});
