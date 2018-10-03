/* eslint-env jest */

const generateBlogPages = require('./generateBlogPages').default;

test('generateBlogPages() should generate blog pages', () => {
  const edges = [
    {
      node: {
        frontmatter: {
          path: '/foo',
          category: 'Foo',
          tags: ['bar'],
        },
      },
    },
  ];
  const graphql = jest.fn(
    () =>
      new Promise(resolve =>
        resolve({ data: { allMarkdownRemark: { edges } } })
      )
  );
  const createPage = jest.fn();
  return generateBlogPages(graphql, createPage).then(() => {
    expect(graphql).toHaveBeenCalledTimes(1);
    // 1 to create blog post page
    // + 1 to create paginated page
    // + 1 to create category page
    // + 1 to create tag page
    expect(createPage).toHaveBeenCalledTimes(4);
  });
});

test('generateBlogPages() should throw error if query fails', () => {
  const graphql = jest.fn(
    () => new Promise(resolve => resolve({ errors: ['invalid'] }))
  );
  const createPage = jest.fn();
  return generateBlogPages(graphql, createPage).then(() => {
    expect(graphql).toHaveBeenCalledTimes(1);
    expect(createPage).not.toHaveBeenCalled();
  });
});
