import React from 'react';
import { shallow } from 'enzyme';
import ImprintPage from './imprint';

describe('ImprintPage', () => {
  const page = shallow(<ImprintPage />);

  it('should render', () => {
    expect(page.exists()).toBe(true);
  });
});
