import React from 'react';
import { shallow } from 'enzyme';
import CreateUser from '../components/create-user.component';

it('renders create new user without crashing', () => {
  expect(shallow(<CreateUser/>)).toMatchSnapshot();
});