import Header from './Header';
import React from 'react';
import { shallow } from 'enzyme';

describe('Header', () => {
  it('should render', () => {
    const component = shallow(<Header siteTitle="foo" />);
    expect(component.hasClass('header')).toBeTruthy();
    expect(component.find('.logo').prop('to')).toBe('/');
  });
});
