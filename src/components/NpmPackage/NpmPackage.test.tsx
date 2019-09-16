import { shallow } from 'enzyme';
import { NpmPackage } from './NpmPackage';
import npmsPackageFixture from '../../tests/fixtures/npmsPackageFixture';
import React from 'react';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('NpmPackage', () => {
  it('should render package information', () => {
    const component = shallow(
      <NpmPackage pckgName="foo" pckgData={npmsPackageFixture} />
    );
    expect(component.find('.pckgVersion').text()).toContain('1.0.1');
  });
});
