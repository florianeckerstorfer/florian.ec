import React from 'react';
import { shallow } from 'enzyme';
import Label from './Label';

describe('Label', () => {
  it('should render', () => {
    const component = shallow(<Label>foobar</Label>);

    expect(component.exists()).toBe(true);
    expect(component.text()).toBe('foobar');
  });
});
