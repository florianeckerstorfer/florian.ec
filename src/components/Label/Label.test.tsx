import Label from './Label';
import React from 'react';
import { shallow } from 'enzyme';

describe('Label', () => {
  it('should render', () => {
    const component = shallow(<Label>foobar</Label>);

    expect(component.exists()).toBe(true);
    expect(component.text()).toBe('foobar');
  });
});
