import React from 'react';
import { shallow } from 'enzyme';
import H2 from './H2';

describe('H2', () => {
  it('should render', () => {
    const component = shallow(<H2>Headline</H2>);
    expect(component.exists()).toBe(true);
    expect(component.text()).toBe('Headline');
  });
});
