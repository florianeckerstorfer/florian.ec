import IBlogNode from '../../types/IBlogNode';

const blogNode: IBlogNode = {
  frontmatter: {
    category: 'Foo',
    date: '2019-05-05',
    slug: '/foo',
    title: 'my blog post',
  },
  fields: {
    slug: '/foo',
  },
  excerpt: 'my excerpt',
};

export default { blogNode };
