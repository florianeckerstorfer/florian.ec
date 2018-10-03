/* eslint-env jest */

const createContentPages = require('./createContentPages').default;

test('createContentPages() should create all pages', () => {
  const createPage = jest.fn();
  const pages = [
    { node: { frontmatter: { path: '/foo1' } } },
    { node: { frontmatter: { path: '/foo2' } } },
  ];
  createContentPages(createPage, pages);
  expect(createPage).toHaveBeenCalledTimes(2);
  expect(createPage.mock.calls[0][0].path).toBe('/foo1');
  expect(createPage.mock.calls[1][0].path).toBe('/foo2');
});
