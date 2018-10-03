/* eslint-env jest */

const generateContentPages = require('./generateContentPages').default;

test('generateContentPages() should generate content pages', () => {
  const graphql = jest.fn(
    () =>
      new Promise(resolve =>
        resolve({
          data: {
            allMarkdownRemark: {
              edges: [{ node: { frontmatter: { path: '/foo' } } }],
            },
          },
        })
      )
  );
  const createPage = jest.fn();
  return generateContentPages(graphql, createPage).then(() => {
    expect(graphql).toHaveBeenCalledTimes(1);
    expect(createPage).toHaveBeenCalledTimes(1);
  });
});

test('generateContentPages() should throw error if query fails', () => {
  const graphql = jest.fn(
    () => new Promise(resolve => resolve({ errors: ['invalid'] }))
  );
  const createPage = jest.fn();
  return generateContentPages(graphql, createPage).then(() => {
    expect(graphql).toHaveBeenCalledTimes(1);
    expect(createPage).not.toHaveBeenCalled();
  });
});
