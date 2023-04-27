import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import TimeOfDaySagas from '../../../../../app/modules/entities/time-of-day/time-of-day.sagas';
import TimeOfDayActions from '../../../../../app/modules/entities/time-of-day/time-of-day.reducer';

const { getTimeOfDay, getAllTimeOfDays, updateTimeOfDay, deleteTimeOfDay } = TimeOfDaySagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getTimeOfDay(1);
  const step = stepper(getTimeOfDay(FixtureAPI, { timeOfDayId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TimeOfDayActions.timeOfDaySuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getTimeOfDay(FixtureAPI, { timeOfDayId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TimeOfDayActions.timeOfDayFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllTimeOfDays();
  const step = stepper(getAllTimeOfDays(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TimeOfDayActions.timeOfDayAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllTimeOfDays(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TimeOfDayActions.timeOfDayAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateTimeOfDay({ id: 1 });
  const step = stepper(updateTimeOfDay(FixtureAPI, { timeOfDay: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TimeOfDayActions.timeOfDayUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateTimeOfDay(FixtureAPI, { timeOfDay: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TimeOfDayActions.timeOfDayUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteTimeOfDay({ id: 1 });
  const step = stepper(deleteTimeOfDay(FixtureAPI, { timeOfDayId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TimeOfDayActions.timeOfDayDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteTimeOfDay(FixtureAPI, { timeOfDayId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TimeOfDayActions.timeOfDayDeleteFailure()));
});
