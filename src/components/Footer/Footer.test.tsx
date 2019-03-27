import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

test('Footer should render', () => {
  const component = shallow(<Footer />);
  expect(component.hasClass('footer')).toBeTruthy();
});
