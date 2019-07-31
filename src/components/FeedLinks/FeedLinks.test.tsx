import FeedLinks from './FeedLinks';
import React from 'react';
import { shallow } from 'enzyme';

describe('FeedLinks', (): void => {
  it('should render links to RSS, Atom and JSON Feed', (): void => {
    const component = shallow(<FeedLinks />);
    const feeds = component.find('.feeds').children();

    expect(component.exists()).toBe(true);
    expect(feeds.length).toBe(3);
    expect(feeds.at(0).text()).toContain('RSS');
    expect(feeds.at(1).text()).toContain('Atom');
    expect(feeds.at(2).text()).toContain('JSON');
  });
});
