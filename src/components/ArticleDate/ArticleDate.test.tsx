import ArticleDate from './ArticleDate';
import React from 'react';
import { shallow } from 'enzyme';

describe('ArticleDate', () => {
  it('should render', () => {
    const component = shallow(<ArticleDate date="2019-05-02" />);

    expect(component.exists()).toBe(true);
    expect(component.text()).toBe('May 2, 2019');
    expect(component.prop('dateTime')).toBe('2019-05-02');
  });
});
