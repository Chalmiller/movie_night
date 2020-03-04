import React from 'react';
import { shallow } from 'enzyme';
import CreateComment from '../components/create-comment.component';

it('renders create comment without crashing', () => {
  expect(shallow(<CreateComment/>)).toMatchSnapshot();
});