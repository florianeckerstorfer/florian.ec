import { shallow } from 'enzyme';
import React from 'react';
import withNpmPackageData from './withNpmPackageData';

function Wrapped() {
  return <div />;
}

describe('withNpmPackageData()', () => {
  it('should return a HOC that fetches NPM package', () => {
    const Base = withNpmPackageData(Wrapped);
    const component = shallow(<Base pckgName="foobar" />);
    expect(component.exists()).toBe(true);
  });
});
