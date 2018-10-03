/* eslint-env jest */

const createTagPages = require('./createTagPages').default;

test('createTagPages() should create all tag pages', () => {
  const createPage = jest.fn();
  const pages = [
    { node: { frontmatter: { tags: ['foo', 'bar'] } } },
    { node: { frontmatter: { tags: ['foobar', 'bar'] } } },
    { node: { frontmatter: { tags: ['foo'] } } },
    { node: { frontmatter: { tags: [] } } },
    { node: { frontmatter: {} } },
  ];
  createTagPages(createPage, pages);
  expect(createPage).toHaveBeenCalledTimes(3);
  expect(createPage.mock.calls[0][0].path).toBe('/tags/foo/');
  expect(createPage.mock.calls[0][0].context.tag).toBe('foo');
  expect(createPage.mock.calls[1][0].path).toBe('/tags/bar/');
  expect(createPage.mock.calls[1][0].context.tag).toBe('bar');
  expect(createPage.mock.calls[2][0].path).toBe('/tags/foobar/');
  expect(createPage.mock.calls[2][0].context.tag).toBe('foobar');
});
