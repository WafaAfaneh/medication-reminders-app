import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/reminder/reminder.reducer';

test('attempt retrieving a single reminder', () => {
  const state = reducer(INITIAL_STATE, Actions.reminderRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.reminder).toEqual({ id: undefined });
});

test('attempt retrieving a list of reminder', () => {
  const state = reducer(INITIAL_STATE, Actions.reminderAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.reminderList).toEqual([]);
});

test('attempt updating a reminder', () => {
  const state = reducer(INITIAL_STATE, Actions.reminderUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a reminder', () => {
  const state = reducer(INITIAL_STATE, Actions.reminderDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a reminder', () => {
  const state = reducer(INITIAL_STATE, Actions.reminderSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.reminder).toEqual({ id: 1 });
});

test('success retrieving a list of reminder', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.reminderAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.reminderList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a reminder', () => {
  const state = reducer(INITIAL_STATE, Actions.reminderUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.reminder).toEqual({ id: 1 });
});
test('success deleting a reminder', () => {
  const state = reducer(INITIAL_STATE, Actions.reminderDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.reminder).toEqual({ id: undefined });
});

test('failure retrieving a reminder', () => {
  const state = reducer(INITIAL_STATE, Actions.reminderFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.reminder).toEqual({ id: undefined });
});

test('failure retrieving a list of reminder', () => {
  const state = reducer(INITIAL_STATE, Actions.reminderAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.reminderList).toEqual([]);
});

test('failure updating a reminder', () => {
  const state = reducer(INITIAL_STATE, Actions.reminderUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.reminder).toEqual(INITIAL_STATE.reminder);
});
test('failure deleting a reminder', () => {
  const state = reducer(INITIAL_STATE, Actions.reminderDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.reminder).toEqual(INITIAL_STATE.reminder);
});

test('resetting state for reminder', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.reminderReset());
  expect(state).toEqual(INITIAL_STATE);
});
