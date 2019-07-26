import H1 from './H1';
import React from 'react';
import { shallow } from 'enzyme';

describe('H1', () => {
  it('should render', () => {
    const component = shallow(<H1>Headline</H1>);
    expect(component.exists()).toBe(true);
    expect(component.text()).toBe('Headline');
  });
});
