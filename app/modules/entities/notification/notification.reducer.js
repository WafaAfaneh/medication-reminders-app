import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notificationRequest: ['notificationId'],
  notificationAllRequest: ['options'],
  notificationUpdateRequest: ['notification'],
  notificationDeleteRequest: ['notificationId'],

  notificationSuccess: ['notification'],
  notificationAllSuccess: ['notificationList', 'headers'],
  notificationUpdateSuccess: ['notification'],
  notificationDeleteSuccess: [],

  notificationFailure: ['error'],
  notificationAllFailure: ['error'],
  notificationUpdateFailure: ['error'],
  notificationDeleteFailure: ['error'],

  notificationReset: [],
});

export const NotificationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  notification: { id: undefined },
  notificationList: [],
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
    notification: INITIAL_STATE.notification,
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
  const { notification } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    notification,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { notificationList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    notificationList: loadMoreDataWhenScrolled(state.notificationList, notificationList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { notification } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    notification,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    notification: INITIAL_STATE.notification,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    notification: INITIAL_STATE.notification,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    notificationList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    notification: state.notification,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    notification: state.notification,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATION_REQUEST]: request,
  [Types.NOTIFICATION_ALL_REQUEST]: allRequest,
  [Types.NOTIFICATION_UPDATE_REQUEST]: updateRequest,
  [Types.NOTIFICATION_DELETE_REQUEST]: deleteRequest,

  [Types.NOTIFICATION_SUCCESS]: success,
  [Types.NOTIFICATION_ALL_SUCCESS]: allSuccess,
  [Types.NOTIFICATION_UPDATE_SUCCESS]: updateSuccess,
  [Types.NOTIFICATION_DELETE_SUCCESS]: deleteSuccess,

  [Types.NOTIFICATION_FAILURE]: failure,
  [Types.NOTIFICATION_ALL_FAILURE]: allFailure,
  [Types.NOTIFICATION_UPDATE_FAILURE]: updateFailure,
  [Types.NOTIFICATION_DELETE_FAILURE]: deleteFailure,
  [Types.NOTIFICATION_RESET]: reset,
});
