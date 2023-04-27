import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import MedicationSagas from '../../../../../app/modules/entities/medication/medication.sagas';
import MedicationActions from '../../../../../app/modules/entities/medication/medication.reducer';

const { getMedication, getAllMedications, updateMedication, deleteMedication } = MedicationSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getMedication(1);
  const step = stepper(getMedication(FixtureAPI, { medicationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MedicationActions.medicationSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getMedication(FixtureAPI, { medicationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MedicationActions.medicationFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllMedications();
  const step = stepper(getAllMedications(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MedicationActions.medicationAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllMedications(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MedicationActions.medicationAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateMedication({ id: 1 });
  const step = stepper(updateMedication(FixtureAPI, { medication: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MedicationActions.medicationUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateMedication(FixtureAPI, { medication: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MedicationActions.medicationUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteMedication({ id: 1 });
  const step = stepper(deleteMedication(FixtureAPI, { medicationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MedicationActions.medicationDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteMedication(FixtureAPI, { medicationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MedicationActions.medicationDeleteFailure()));
});
