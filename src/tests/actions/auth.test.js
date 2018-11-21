import { login, logout } from '../../actions/auth';

test('Should generate login action object', () => {
  const uid = 'xqwexczawe12as';
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid: expect.any(String)
  });
});

test('Should generate logout action object', () => {
  const action = logout();
  expect(action).toEqual({ type: 'LOGOUT' });
});