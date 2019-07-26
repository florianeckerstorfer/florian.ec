import React from 'react';
import { shallow } from 'enzyme';
import PrivacyPage from './privacy';

describe('PrivacyPage', () => {
  const page = shallow(<PrivacyPage />);
  it('should render', () => {
    expect(page.exists()).toBe(true);
  });
});
