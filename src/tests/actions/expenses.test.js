import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

test('Should setup remove expense action object', () => {
  const result = removeExpense({id: 'abc123'})

  expect(result).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 'abc123'
  });
});

test('Should setup edit expense action object', () => {
  const result = editExpense( 'abc123', { note: 'new note value' })

  expect(result).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'abc123',
    updates: {
      note: 'new note value',
    }
  });
});

test('Should add expense action object with provided values', () => {
  const expenseData = {
    description: 'Description',
    note: 'note',
    amount: 100,
    createdAt: 200
  };

  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  })
});

test('Should add expense action object with default values', () => {
  const action = addExpense();

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  })
});