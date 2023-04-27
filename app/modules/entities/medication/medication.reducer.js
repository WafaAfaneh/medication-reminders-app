import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  medicationRequest: ['medicationId'],
  medicationAllRequest: ['options'],
  medicationUpdateRequest: ['medication'],
  medicationDeleteRequest: ['medicationId'],

  medicationSuccess: ['medication'],
  medicationAllSuccess: ['medicationList', 'headers'],
  medicationUpdateSuccess: ['medication'],
  medicationDeleteSuccess: [],

  medicationFailure: ['error'],
  medicationAllFailure: ['error'],
  medicationUpdateFailure: ['error'],
  medicationDeleteFailure: ['error'],

  medicationReset: [],
});

export const MedicationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  medication: { id: undefined },
  medicationList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    medication: INITIAL_STATE.medication,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { medication } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    medication,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { medicationList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    medicationList: loadMoreDataWhenScrolled(state.medicationList, medicationList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { medication } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    medication,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    medication: INITIAL_STATE.medication,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    medication: INITIAL_STATE.medication,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    medicationList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    medication: state.medication,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    medication: state.medication,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MEDICATION_REQUEST]: request,
  [Types.MEDICATION_ALL_REQUEST]: allRequest,
  [Types.MEDICATION_UPDATE_REQUEST]: updateRequest,
  [Types.MEDICATION_DELETE_REQUEST]: deleteRequest,

  [Types.MEDICATION_SUCCESS]: success,
  [Types.MEDICATION_ALL_SUCCESS]: allSuccess,
  [Types.MEDICATION_UPDATE_SUCCESS]: updateSuccess,
  [Types.MEDICATION_DELETE_SUCCESS]: deleteSuccess,

  [Types.MEDICATION_FAILURE]: failure,
  [Types.MEDICATION_ALL_FAILURE]: allFailure,
  [Types.MEDICATION_UPDATE_FAILURE]: updateFailure,
  [Types.MEDICATION_DELETE_FAILURE]: deleteFailure,
  [Types.MEDICATION_RESET]: reset,
});
