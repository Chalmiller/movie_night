import React from 'react';
import { shallow } from 'enzyme';
import CommentList from './comment-list.component';

it('renders comment list without crashing', () => {
  expect(shallow(<CommentList/>)).toMatchSnapshot();
});