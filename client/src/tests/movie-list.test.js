import React from 'react';
import { shallow } from 'enzyme';
import MovieList from '../components/movie-list.component';

it('renders comment list without crashing', () => {
  expect(shallow(<MovieList/>)).toMatchSnapshot();
});