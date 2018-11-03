import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

test('Shoul render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should return ExpenseList with empty message', () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
})