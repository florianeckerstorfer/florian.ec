import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  it('should render', () => {
    const component = shallow(<Header siteTitle="foo" />);
    expect(component.hasClass('header')).toBeTruthy();
    expect(component.find('.logo').prop('to')).toBe('/');
  });
});
