import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/time-of-day/time-of-day.reducer';

test('attempt retrieving a single timeOfDay', () => {
  const state = reducer(INITIAL_STATE, Actions.timeOfDayRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.timeOfDay).toEqual({ id: undefined });
});

test('attempt retrieving a list of timeOfDay', () => {
  const state = reducer(INITIAL_STATE, Actions.timeOfDayAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.timeOfDayList).toEqual([]);
});

test('attempt updating a timeOfDay', () => {
  const state = reducer(INITIAL_STATE, Actions.timeOfDayUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a timeOfDay', () => {
  const state = reducer(INITIAL_STATE, Actions.timeOfDayDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a timeOfDay', () => {
  const state = reducer(INITIAL_STATE, Actions.timeOfDaySuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.timeOfDay).toEqual({ id: 1 });
});

test('success retrieving a list of timeOfDay', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.timeOfDayAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.timeOfDayList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a timeOfDay', () => {
  const state = reducer(INITIAL_STATE, Actions.timeOfDayUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.timeOfDay).toEqual({ id: 1 });
});
test('success deleting a timeOfDay', () => {
  const state = reducer(INITIAL_STATE, Actions.timeOfDayDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.timeOfDay).toEqual({ id: undefined });
});

test('failure retrieving a timeOfDay', () => {
  const state = reducer(INITIAL_STATE, Actions.timeOfDayFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.timeOfDay).toEqual({ id: undefined });
});

test('failure retrieving a list of timeOfDay', () => {
  const state = reducer(INITIAL_STATE, Actions.timeOfDayAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.timeOfDayList).toEqual([]);
});

test('failure updating a timeOfDay', () => {
  const state = reducer(INITIAL_STATE, Actions.timeOfDayUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.timeOfDay).toEqual(INITIAL_STATE.timeOfDay);
});
test('failure deleting a timeOfDay', () => {
  const state = reducer(INITIAL_STATE, Actions.timeOfDayDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.timeOfDay).toEqual(INITIAL_STATE.timeOfDay);
});

test('resetting state for timeOfDay', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.timeOfDayReset());
  expect(state).toEqual(INITIAL_STATE);
});
