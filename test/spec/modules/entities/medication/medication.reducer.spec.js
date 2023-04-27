import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/medication/medication.reducer';

test('attempt retrieving a single medication', () => {
  const state = reducer(INITIAL_STATE, Actions.medicationRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.medication).toEqual({ id: undefined });
});

test('attempt retrieving a list of medication', () => {
  const state = reducer(INITIAL_STATE, Actions.medicationAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.medicationList).toEqual([]);
});

test('attempt updating a medication', () => {
  const state = reducer(INITIAL_STATE, Actions.medicationUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a medication', () => {
  const state = reducer(INITIAL_STATE, Actions.medicationDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a medication', () => {
  const state = reducer(INITIAL_STATE, Actions.medicationSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.medication).toEqual({ id: 1 });
});

test('success retrieving a list of medication', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.medicationAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.medicationList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a medication', () => {
  const state = reducer(INITIAL_STATE, Actions.medicationUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.medication).toEqual({ id: 1 });
});
test('success deleting a medication', () => {
  const state = reducer(INITIAL_STATE, Actions.medicationDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.medication).toEqual({ id: undefined });
});

test('failure retrieving a medication', () => {
  const state = reducer(INITIAL_STATE, Actions.medicationFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.medication).toEqual({ id: undefined });
});

test('failure retrieving a list of medication', () => {
  const state = reducer(INITIAL_STATE, Actions.medicationAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.medicationList).toEqual([]);
});

test('failure updating a medication', () => {
  const state = reducer(INITIAL_STATE, Actions.medicationUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.medication).toEqual(INITIAL_STATE.medication);
});
test('failure deleting a medication', () => {
  const state = reducer(INITIAL_STATE, Actions.medicationDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.medication).toEqual(INITIAL_STATE.medication);
});

test('resetting state for medication', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.medicationReset());
  expect(state).toEqual(INITIAL_STATE);
});
