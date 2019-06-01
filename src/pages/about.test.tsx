import React from 'react';
import { shallow } from 'enzyme';
import AboutPage, { Props } from './about';

const defaultProps: Props = {
  data: {
    file: {
      childImageSharp: {
        fluid: {
          aspectRatio: 1.5,
          src: '/foo.jpg',
          base64: 'FOOBAR',
          srcSet: '/foo.jpg',
          sizes: '100w',
        },
      },
    },
  },
};

describe('AboutPage', () => {
  it('should render', () => {
    const page = shallow(<AboutPage {...defaultProps} />);
    expect(page.exists()).toBe(true);
  });
});
