import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import FrequencyActions from './frequency.reducer';

function* getFrequency(api, action) {
  const { frequencyId } = action;
  // make the call to the api
  const apiCall = call(api.getFrequency, frequencyId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FrequencyActions.frequencySuccess(response.data));
  } else {
    yield put(FrequencyActions.frequencyFailure(response.data));
  }
}

function* getAllFrequencies(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllFrequencies, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FrequencyActions.frequencyAllSuccess(response.data, response.headers));
  } else {
    yield put(FrequencyActions.frequencyAllFailure(response.data));
  }
}

function* updateFrequency(api, action) {
  const { frequency } = action;
  // make the call to the api
  const idIsNotNull = !(frequency.id === null || frequency.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateFrequency : api.createFrequency, frequency);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FrequencyActions.frequencyUpdateSuccess(response.data));
  } else {
    yield put(FrequencyActions.frequencyUpdateFailure(response.data));
  }
}

function* deleteFrequency(api, action) {
  const { frequencyId } = action;
  // make the call to the api
  const apiCall = call(api.deleteFrequency, frequencyId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FrequencyActions.frequencyDeleteSuccess());
  } else {
    yield put(FrequencyActions.frequencyDeleteFailure(response.data));
  }
}

export default {
  getAllFrequencies,
  getFrequency,
  deleteFrequency,
  updateFrequency,
};
