import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/frequency/frequency.reducer';

test('attempt retrieving a single frequency', () => {
  const state = reducer(INITIAL_STATE, Actions.frequencyRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.frequency).toEqual({ id: undefined });
});

test('attempt retrieving a list of frequency', () => {
  const state = reducer(INITIAL_STATE, Actions.frequencyAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.frequencyList).toEqual([]);
});

test('attempt updating a frequency', () => {
  const state = reducer(INITIAL_STATE, Actions.frequencyUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a frequency', () => {
  const state = reducer(INITIAL_STATE, Actions.frequencyDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a frequency', () => {
  const state = reducer(INITIAL_STATE, Actions.frequencySuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.frequency).toEqual({ id: 1 });
});

test('success retrieving a list of frequency', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.frequencyAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.frequencyList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a frequency', () => {
  const state = reducer(INITIAL_STATE, Actions.frequencyUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.frequency).toEqual({ id: 1 });
});
test('success deleting a frequency', () => {
  const state = reducer(INITIAL_STATE, Actions.frequencyDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.frequency).toEqual({ id: undefined });
});

test('failure retrieving a frequency', () => {
  const state = reducer(INITIAL_STATE, Actions.frequencyFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.frequency).toEqual({ id: undefined });
});

test('failure retrieving a list of frequency', () => {
  const state = reducer(INITIAL_STATE, Actions.frequencyAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.frequencyList).toEqual([]);
});

test('failure updating a frequency', () => {
  const state = reducer(INITIAL_STATE, Actions.frequencyUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.frequency).toEqual(INITIAL_STATE.frequency);
});
test('failure deleting a frequency', () => {
  const state = reducer(INITIAL_STATE, Actions.frequencyDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.frequency).toEqual(INITIAL_STATE.frequency);
});

test('resetting state for frequency', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.frequencyReset());
  expect(state).toEqual(INITIAL_STATE);
});
