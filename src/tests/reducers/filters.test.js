import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('Should setup default filter values', () => {
  const result = filtersReducer(undefined, { type: '@@init' });
  expect(result).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('Should set sortBy to amount', () => {
  const result = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(result.sortBy).toBe('amount');
});

test('Should set sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const result = filtersReducer(currentState, { type: 'SORT_BY_DATE' });
  expect(result.sortBy).toBe('date');
});

test('Should set text filter', () => {
  const text = 'Rent';
  const action = {
    type: 'SET_TEXT_FILTER',
    text
  };
  const result = filtersReducer(undefined, action);
  expect(result.text).toBe(text);
});

test('Should set startDate filter', () => {
  const startDate = moment();
  const action = {
    type: 'SET_START_DATE',
    startDate
  };
  const result = filtersReducer(undefined, action);
  expect(result.startDate).toBe(startDate);
});

test('Should set startDate filter', () => {
  const endDate = moment();
  const action = {
    type: 'SET_END_DATE',
    endDate
  };
  const result = filtersReducer(undefined, action);
  expect(result.endDate).toBe(endDate)
});

