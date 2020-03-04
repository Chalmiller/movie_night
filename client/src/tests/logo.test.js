import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../components/logo.component';

it('renders logo without crashing', () => {
  expect(shallow(<Logo/>)).toMatchSnapshot();
});