import H2 from './H2';
import React from 'react';
import { shallow } from 'enzyme';

describe('H2', (): void => {
  it('should render', (): void => {
    const component = shallow(<H2>Headline</H2>);
    expect(component.exists()).toBe(true);
    expect(component.text()).toBe('Headline');
  });

  it('should render with "aside" style', (): void => {
    const component = shallow(<H2 style="aside">Headline</H2>);

    expect(component.exists()).toBe(true);
    expect(component.hasClass('aside')).toBe(true);
  });
});
