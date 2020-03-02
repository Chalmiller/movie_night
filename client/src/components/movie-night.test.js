import React from 'react';
import { shallow } from 'enzyme';
import MovieNight from './movie-night.component';

it('renders movie night without crashing', () => {
  expect(shallow(<MovieNight/>)).toMatchSnapshot();
});