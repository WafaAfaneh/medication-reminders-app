import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import FrequencySagas from '../../../../../app/modules/entities/frequency/frequency.sagas';
import FrequencyActions from '../../../../../app/modules/entities/frequency/frequency.reducer';

const { getFrequency, getAllFrequencies, updateFrequency, deleteFrequency } = FrequencySagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getFrequency(1);
  const step = stepper(getFrequency(FixtureAPI, { frequencyId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FrequencyActions.frequencySuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getFrequency(FixtureAPI, { frequencyId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FrequencyActions.frequencyFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllFrequencies();
  const step = stepper(getAllFrequencies(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FrequencyActions.frequencyAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllFrequencies(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FrequencyActions.frequencyAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateFrequency({ id: 1 });
  const step = stepper(updateFrequency(FixtureAPI, { frequency: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FrequencyActions.frequencyUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateFrequency(FixtureAPI, { frequency: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FrequencyActions.frequencyUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteFrequency({ id: 1 });
  const step = stepper(deleteFrequency(FixtureAPI, { frequencyId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FrequencyActions.frequencyDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteFrequency(FixtureAPI, { frequencyId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FrequencyActions.frequencyDeleteFailure()));
});
