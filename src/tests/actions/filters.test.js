import moment from 'moment';
import { setTextFilter, 
  sortByDate, 
  sortByAmount, 
  setStartDate, 
  setEndDate 
} from '../../actions/filters';

test('Should generat set text filter action object with text value', () => {
  const action = setTextFilter('rent');
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'rent'
  });
});

test('Should generat set text filter action object with default value', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

test('Should generate action object for sort by date', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

test('Should generate action object for sort by amount', () => {
  expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});

test('Should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0),
  });
});

test('Should generate end start date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0),
  });
});