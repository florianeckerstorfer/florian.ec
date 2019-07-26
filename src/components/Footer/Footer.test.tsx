import Footer from './Footer';
import React from 'react';
import { shallow } from 'enzyme';

describe('Footer', () => {
  const component = shallow(<Footer />);

  it('should render', () => {
    expect(component.hasClass('footer')).toBeTruthy();
  });

  it('should contain link to imprint', () => {
    expect(component.find('[to="/imprint"]').length).toBeGreaterThanOrEqual(1);
  });

  it('should contain link to privacy policy', () => {
    expect(component.find('[to="/privacy"]').length).toBeGreaterThanOrEqual(1);
  });
});
