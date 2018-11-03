import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeAll(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      filters={filters}
    />
  );
});

test('Should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('Should handle text change', () => {
  const value = 'Gas';
  wrapper.find('input').simulate('change',{
    target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('Should sort by date', () => {
  const value = 'date';
  wrapper.setProps({
    filters: altFilters
  });
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('Should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('Should handle date change', () => {
  const startDate = moment(0);
  const endDate = moment(0).add(2, 'days');
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('Should handle date focus change', () => {
  const calendarFocused = 'startDate'
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
})