import React from 'react';
import { shallow } from 'enzyme';
import EditMovie from '../components/edit-movie.component';

it('renders edit movie without crashing', () => {
  expect(shallow(<EditMovie/>)).toMatchSnapshot();
});