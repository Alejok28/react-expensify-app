import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, removeExpense, editExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData = {};
  expenses.forEach(({ id, description, note, createdAt, amount }) => {
    expenseData[id]={ description, note, createdAt, amount };
  })
  database.ref('expenses').set(expenseData).then(() => done());

})

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
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  })
});

test('Should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then(snapshot => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('Should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then(snapshot => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});

test('Should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type:'SET_EXPENSES',
    expenses
  });
});

test('Should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  })
})
