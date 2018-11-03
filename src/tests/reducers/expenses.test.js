import expensesReducer from '../../reducers/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';


test('Should set default test', () => {
  const state = expensesReducer(undefined, { type: '@@init'});
  expect(state).toEqual([]);
});

test('Should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[0].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1], expenses[2]]);
});

test('Should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('Should add an expense', () => {
  const expense = {
    id: '4',
    description: 'Motorcycle',
    note: '',
    amount: 123,
    createdAt: 0
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses.concat(expense));
}); 

test('Should edit an expense', () => {
  const note = 'new note';
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      note
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[0].note).toBe('new note');
});

test('Should not edit expense if expense not found', () => {
  const amount = 888;
  const action = {
    type: 'EDIT_EXPENSE',
    id: '6',
    updates: {
      amount
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});