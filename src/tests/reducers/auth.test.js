import authReducer from '../../reducers/auth';

test('Should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: 'asdwaeawe123as'
  }
  const state = authReducer(null, action);
  expect(state.uid).toBe(action.uid);

});

test('Should clear uid for logout', () => {
  const action = {
    type: 'LOGUOT',
  }
  const state = authReducer({uid: 'asdadq23asf2'}, action);
  expect(state).toEqual({});
});