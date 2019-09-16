import fetchNpmsPackage from './fetchNpmsPackage';
import npmsPackageFixture from '../tests/fixtures/npmsPackageFixture';

describe('fetchNpmPackage()', () => {
  it('should return response as object', async () => {
    fetchMock.mockResponse(JSON.stringify(npmsPackageFixture));

    const pckg = await fetchNpmsPackage('foobar');

    expect(pckg.collected.metadata.name).toBe('foobar');
  });
});
