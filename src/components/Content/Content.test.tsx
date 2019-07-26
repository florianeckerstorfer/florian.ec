import Content from './Content';
import React from 'react';
import { shallow } from 'enzyme';

describe('Content', () => {
  it('should render', () => {
    const component = shallow(<Content>Foobar</Content>);
    expect(component.exists()).toBe(true);
    expect(component.text()).toContain('Foobar');
  });
});
