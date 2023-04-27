import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  frequencyRequest: ['frequencyId'],
  frequencyAllRequest: ['options'],
  frequencyUpdateRequest: ['frequency'],
  frequencyDeleteRequest: ['frequencyId'],

  frequencySuccess: ['frequency'],
  frequencyAllSuccess: ['frequencyList', 'headers'],
  frequencyUpdateSuccess: ['frequency'],
  frequencyDeleteSuccess: [],

  frequencyFailure: ['error'],
  frequencyAllFailure: ['error'],
  frequencyUpdateFailure: ['error'],
  frequencyDeleteFailure: ['error'],

  frequencyReset: [],
});

export const FrequencyTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  frequency: { id: undefined },
  frequencyList: [],
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
    frequency: INITIAL_STATE.frequency,
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
  const { frequency } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    frequency,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { frequencyList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    frequencyList: loadMoreDataWhenScrolled(state.frequencyList, frequencyList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { frequency } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    frequency,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    frequency: INITIAL_STATE.frequency,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    frequency: INITIAL_STATE.frequency,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    frequencyList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    frequency: state.frequency,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    frequency: state.frequency,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FREQUENCY_REQUEST]: request,
  [Types.FREQUENCY_ALL_REQUEST]: allRequest,
  [Types.FREQUENCY_UPDATE_REQUEST]: updateRequest,
  [Types.FREQUENCY_DELETE_REQUEST]: deleteRequest,

  [Types.FREQUENCY_SUCCESS]: success,
  [Types.FREQUENCY_ALL_SUCCESS]: allSuccess,
  [Types.FREQUENCY_UPDATE_SUCCESS]: updateSuccess,
  [Types.FREQUENCY_DELETE_SUCCESS]: deleteSuccess,

  [Types.FREQUENCY_FAILURE]: failure,
  [Types.FREQUENCY_ALL_FAILURE]: allFailure,
  [Types.FREQUENCY_UPDATE_FAILURE]: updateFailure,
  [Types.FREQUENCY_DELETE_FAILURE]: deleteFailure,
  [Types.FREQUENCY_RESET]: reset,
});
