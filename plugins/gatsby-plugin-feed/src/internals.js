export const defaultOptions = {
  createLinkInHead: true,
  author: undefined,
  copyright: undefined,
  description: undefined,
  email: false,
  id: undefined,
  link: undefined,
  title: undefined,
  limit: 10,
  match: '^/blog/',
  output: {
    rss2: 'rss.xml',
    atom: 'atom.xml',
    json: 'feed.json',
  },
};
