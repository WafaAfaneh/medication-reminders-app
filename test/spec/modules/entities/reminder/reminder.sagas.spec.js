import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ReminderSagas from '../../../../../app/modules/entities/reminder/reminder.sagas';
import ReminderActions from '../../../../../app/modules/entities/reminder/reminder.reducer';

const { getReminder, getAllReminders, updateReminder, deleteReminder } = ReminderSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getReminder(1);
  const step = stepper(getReminder(FixtureAPI, { reminderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ReminderActions.reminderSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getReminder(FixtureAPI, { reminderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ReminderActions.reminderFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllReminders();
  const step = stepper(getAllReminders(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ReminderActions.reminderAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllReminders(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ReminderActions.reminderAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateReminder({ id: 1 });
  const step = stepper(updateReminder(FixtureAPI, { reminder: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ReminderActions.reminderUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateReminder(FixtureAPI, { reminder: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ReminderActions.reminderUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteReminder({ id: 1 });
  const step = stepper(deleteReminder(FixtureAPI, { reminderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ReminderActions.reminderDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteReminder(FixtureAPI, { reminderId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ReminderActions.reminderDeleteFailure()));
});
