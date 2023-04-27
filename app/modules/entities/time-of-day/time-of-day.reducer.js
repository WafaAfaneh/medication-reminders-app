import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  timeOfDayRequest: ['timeOfDayId'],
  timeOfDayAllRequest: ['options'],
  timeOfDayUpdateRequest: ['timeOfDay'],
  timeOfDayDeleteRequest: ['timeOfDayId'],

  timeOfDaySuccess: ['timeOfDay'],
  timeOfDayAllSuccess: ['timeOfDayList', 'headers'],
  timeOfDayUpdateSuccess: ['timeOfDay'],
  timeOfDayDeleteSuccess: [],

  timeOfDayFailure: ['error'],
  timeOfDayAllFailure: ['error'],
  timeOfDayUpdateFailure: ['error'],
  timeOfDayDeleteFailure: ['error'],

  timeOfDayReset: [],
});

export const TimeOfDayTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  timeOfDay: { id: undefined },
  timeOfDayList: [],
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
    timeOfDay: INITIAL_STATE.timeOfDay,
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
  const { timeOfDay } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    timeOfDay,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { timeOfDayList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    timeOfDayList: loadMoreDataWhenScrolled(state.timeOfDayList, timeOfDayList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { timeOfDay } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    timeOfDay,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    timeOfDay: INITIAL_STATE.timeOfDay,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    timeOfDay: INITIAL_STATE.timeOfDay,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    timeOfDayList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    timeOfDay: state.timeOfDay,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    timeOfDay: state.timeOfDay,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TIME_OF_DAY_REQUEST]: request,
  [Types.TIME_OF_DAY_ALL_REQUEST]: allRequest,
  [Types.TIME_OF_DAY_UPDATE_REQUEST]: updateRequest,
  [Types.TIME_OF_DAY_DELETE_REQUEST]: deleteRequest,

  [Types.TIME_OF_DAY_SUCCESS]: success,
  [Types.TIME_OF_DAY_ALL_SUCCESS]: allSuccess,
  [Types.TIME_OF_DAY_UPDATE_SUCCESS]: updateSuccess,
  [Types.TIME_OF_DAY_DELETE_SUCCESS]: deleteSuccess,

  [Types.TIME_OF_DAY_FAILURE]: failure,
  [Types.TIME_OF_DAY_ALL_FAILURE]: allFailure,
  [Types.TIME_OF_DAY_UPDATE_FAILURE]: updateFailure,
  [Types.TIME_OF_DAY_DELETE_FAILURE]: deleteFailure,
  [Types.TIME_OF_DAY_RESET]: reset,
});
