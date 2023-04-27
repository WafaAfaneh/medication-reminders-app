import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import MedicationActions from './medication.reducer';

function* getMedication(api, action) {
  const { medicationId } = action;
  // make the call to the api
  const apiCall = call(api.getMedication, medicationId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MedicationActions.medicationSuccess(response.data));
  } else {
    yield put(MedicationActions.medicationFailure(response.data));
  }
}

function* getAllMedications(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllMedications, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MedicationActions.medicationAllSuccess(response.data, response.headers));
  } else {
    yield put(MedicationActions.medicationAllFailure(response.data));
  }
}

function* updateMedication(api, action) {
  const { medication } = action;
  // make the call to the api
  const idIsNotNull = !(medication.id === null || medication.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateMedication : api.createMedication, medication);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MedicationActions.medicationUpdateSuccess(response.data));
  } else {
    yield put(MedicationActions.medicationUpdateFailure(response.data));
  }
}

function* deleteMedication(api, action) {
  const { medicationId } = action;
  // make the call to the api
  const apiCall = call(api.deleteMedication, medicationId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MedicationActions.medicationDeleteSuccess());
  } else {
    yield put(MedicationActions.medicationDeleteFailure(response.data));
  }
}

export default {
  getAllMedications,
  getMedication,
  deleteMedication,
  updateMedication,
};
