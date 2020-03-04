import React from 'react';
import { shallow } from 'enzyme';
import CreateMovie from './create-movie.component';

it('renders create movie suggestion without crashing', () => {
  expect(shallow(<CreateMovie/>)).toMatchSnapshot();
});