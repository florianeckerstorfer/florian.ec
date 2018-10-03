/* eslint-env jest */

const createCategoryPages = require('./createCategoryPages').default;

test('createCategoryPages() should create category pages', () => {
  const createPage = jest.fn();
  const pages = [
    { node: { frontmatter: { category: 'Foo Bar' } } },
    { node: { frontmatter: { category: 'Foo Bar' } } },
    { node: { frontmatter: { category: 'Foo' } } },
    { node: { frontmatter: {} } },
  ];
  createCategoryPages(createPage, pages);
  expect(createPage).toHaveBeenCalledTimes(2);
  expect(createPage.mock.calls[0][0].path).toBe('/categories/foo-bar/');
  expect(createPage.mock.calls[0][0].context.category).toBe('Foo Bar');
  expect(createPage.mock.calls[1][0].path).toBe('/categories/foo/');
  expect(createPage.mock.calls[1][0].context.category).toBe('Foo');
});
