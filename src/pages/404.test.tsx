import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from './404';

describe('NotFoundPage', () => {
  const page = shallow(<NotFoundPage />);
  it('should render', () => {
    expect(page.exists()).toBe(true);
  });
});
