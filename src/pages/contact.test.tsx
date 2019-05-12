import React from 'react';
import { shallow } from 'enzyme';
import ContactPage from './contact';

describe('ContactPage', () => {
  const page = shallow(<ContactPage />);

  it('should render', () => {
    expect(page.exists()).toBe(true);
  });
});
