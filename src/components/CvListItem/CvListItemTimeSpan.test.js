/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import CvListItemTimeSpan from './CvListItemTimeSpan';

test('CvListItemTimeSpan should render time span', () => {
  const component = shallow(
    <CvListItemTimeSpan start="January 2018" end="June 2018" />
  );
  expect(component.exists()).toBeTruthy();
  expect(component.text()).toBe('January 2018 - June 2018');
});

test('CvListItemTimeSpan should render only start date', () => {
  const component = shallow(<CvListItemTimeSpan start="February 2018" />);
  expect(component.exists()).toBeTruthy();
  expect(component.text()).toBe('since February 2018');
});

test('CvListItemTimeSpan should render only end date', () => {
  const component = shallow(<CvListItemTimeSpan end="September 2018" />);
  expect(component.exists()).toBeTruthy();
  expect(component.text()).toBe('September 2018');
});

test('CvListItemTimeSpan should render nothing if no date is given', () => {
  const component = shallow(<CvListItemTimeSpan />);
  expect(component.exists()).toBeTruthy();
  expect(component.text()).toBe('');
});
