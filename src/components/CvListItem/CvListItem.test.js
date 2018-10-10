/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import CvListItem from './CvListItem';

test('CvListItem should render CV list item with minimal props', () => {
  const component = shallow(
    <CvListItem
      position="Developer"
      organisation={{ name: 'Foo' }}
      location="Bar"
      start="June 2018"
      end="September 2018"
    >
      <li>line 1</li>
      <li>line 2</li>
    </CvListItem>
  );
  expect(component.exists()).toBeTruthy();
  expect(component.hasClass('cv-list__item')).toBeTruthy();
  expect(component.find('.cv-list__item__position').text()).toBe('Developer');
  expect(component.find('.cv-list__item__location').text()).toBe('Bar');

  const description = component.find('.cv-list__item__description');
  expect(description.childAt(0).text()).toBe('line 1');
  expect(description.childAt(1).text()).toBe('line 2');

  const timeSpan = component.find('CvListItemTimeSpan');
  expect(timeSpan.prop('start')).toBe('June 2018');
  expect(timeSpan.prop('end')).toBe('September 2018');
});
