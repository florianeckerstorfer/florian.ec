import React from 'react';
import { shallow } from 'enzyme';
import Content from './Content';

describe('Content', () => {
  it('should render', () => {
    const component = shallow(<Content>Foobar</Content>);
    expect(component.exists()).toBe(true);
    expect(component.text()).toContain('Foobar');
  });
});
